from pathlib import Path
from qiniu import etag, Auth, BucketManager, put_file
import re
import click


def _list_files_under_path_recurive(path):
    return [
        (re.sub("^/", "", re.sub("^" + path, "", str(x))), etag(x))
        for x in Path(path).glob("**/*") if x.is_file()
    ]


def _list_files_in_bucket(auth, bucket):
    b = BucketManager(auth)
    return [(x["key"], x["hash"]) for x in b.list(bucket)[0]["items"]]


def _upload(auth, bucket, key, file):
    token = auth.upload_token(bucket, key, 3600)
    _, info = put_file(token, key, file)
    return info


def _remove(auth, bucket, key):
    b = BucketManager(auth)
    _, info = b.delete(bucket, key)
    return info


@click.command()
@click.option('--access-key', required=True)
@click.option('--secret-key', required=True)
@click.option('--bucket', required=True)
@click.option('--path', required=True)
def sync(access_key, secret_key, bucket, path):
    auth = Auth(access_key, secret_key)
    bucket_files = _list_files_in_bucket(auth, bucket)
    local_files = _list_files_under_path_recurive(path)
    for file in [x for x in bucket_files if x not in local_files]:
        print("delete {}({})".format(*file))
        _remove(auth, bucket, file[0])
    for file in [x for x in local_files if x not in bucket_files]:
        print("upload {}({})".format(*file))
        _upload(auth, bucket, file[0], str(Path(path) / file[0]))


if __name__ == '__main__':
    sync(auto_envvar_prefix='QINIU')

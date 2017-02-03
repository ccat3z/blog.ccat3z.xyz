#! /bin/zsh

echo -e "source 'https://rubygems.org'\n"

export BUNDLE_GEMFILE=Gemfile.orig 

bundle show | grep '*' | sed "s/^  \* \([^ ]*\) (\([^)]*\))/gem \'\1\', \'\2\'/" | sed "/^gem 'bundler'/d" | sed -E 's/$/__END__/' | {
    while :; do
        read ITEM
        [ "x${ITEM}" = "x" ]&&break
        ITEM=$(echo $ITEM | sed -E 's/__END__$//')
        
        echo $ITEM | grep "^gem" &> /dev/null || { echo $ITEM; continue;}
        echo $ITEM | grep "^gem '[^']*', '[^' ]*'$" &> /dev/null && { echo $ITEM; continue;}

        #GIT
        NAME=$(echo $ITEM | sed -E "s/^gem '([^']*)'.*$/\1/")
        REF=$(echo $ITEM | sed -E "s/^gem '[^']*', '[^' ]* ([^']*)'$/\1/")
        GEM="$(cat $BUNDLE_GEMFILE | grep $NAME), :ref => '$REF'"
        echo $GEM
    done
}

module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
      site.config['dev'] = ENV['JEKYLL_DEV'] || 'n'
    end
  end
end
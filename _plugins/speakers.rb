module Jekyll
  class SpeakersIndex < Page
    def initialize(site, base, dir)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      self.read_yaml(File.join(base, '_layouts'), 'speakers.html')
      self.data['speakers'] = self.get_speakers(site)
      self.process(@name)
    end

    def get_speakers(site)
      {}.tap do |speakers|
        Dir['_speakers/*.yml'].each do |path|
          name   = File.basename(path, '.yml')
          config = YAML.load(File.read(File.join(@base, path)))

          if config['active']
            speakers[type][name] = config
          end
        end
      end
    end
  end

  class GenerateSpeakers < Generator
    safe true
    priority :normal

    def generate(site)
      write_speakers(site)
    end

    # Loops through the list of speakers pages and processes each one.
    def write_speakers(site)
      if Dir.exists?('_speakers')
        Dir.chdir('_speakers')
        Dir["*.yml"].each do |path|
          name = File.basename(path, '.yml')
          self.write_speaker_index(site, "_speakers/#{path}", name)
        end

        Dir.chdir(site.source)
        self.write_speakers_index(site)
      end
    end
  end
end

Liquid::Template.register_tag('speakers', Jekyll::AuthorsTag)
Liquid::Template.register_filter(Jekyll::SpeakersPathFilter)
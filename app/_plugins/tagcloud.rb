module Jekyll
  class TagCloudTag < Liquid::Tag
    SIZE_FACTOR = [9, 9.5, 9.5, 10]
    COLOR_FACTOR = [9, 9, 8, 8]

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      output = ''
      site = context.registers[:site]
      page = context.registers[:page]
      tags = site.tags

      min_t, max_t = tags.minmax_by { |key, value| value.count }

      return if min_t.nil? or max_t.nil?

      min = min_t[1].count
      max = max_t[1].count
      diff = max-min
      diff = 1 if diff==0

      @article = site.data['i18n']['article']
      @articles = site.data['i18n']['articles']

      site.tags.each do |tag, posts|
        temp = (posts.count-min)*36/diff
        base = temp/4
        remain = temp%4

        size = base+SIZE_FACTOR[remain]
        color = COLOR_FACTOR[remain]-base

        if page[:url] != '/tags/'
          url = "/tags/#tag-#{tag}"
        else
          url = "#tag-#{tag}"
        end

        output << %Q{<a href="#{url}" style="font-size: #{size}pt; color: ##{color}#{color}#{color};"
        data-toggle="tooltip" data-placement="top" title="#{posts.count}#{articles(posts.count)}">#{tag}</a>&nbsp;}
      end

      output
    end

    def articles(count)
      if count > 1
        @articles
      else
        @article
      end
    end
  end
end

Liquid::Template.register_tag('tag_cloud', Jekyll::TagCloudTag)

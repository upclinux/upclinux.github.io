module Jekyll
  class PagerButton < Liquid::Tag
    def initialize(tag_name, page, tokens)
      super
      @page = page
    end

    def render(context)
      site = context.registers[:site]
      paginate = site.config['paginate'].to_i

      @baseurl = site.config['baseurl']
      @path = site.config['paginate_path']

      page = Liquid::Template.parse(@page).render(context).to_i
      page_count = (site.posts.docs.count + paginate - 1) / paginate

      page_count=1 if page_count<1

      prev_caption = site.data['i18n']['prev_page_mobile']
      next_caption = site.data['i18n']['next_page_mobile']

      output = '<ul class="pager">'

      if page > 1
        output << %Q{<li class="previous">
            <a href="#{page_url(page-1)}">
                <span aria-hidden="true">
                    &larr;
                </span>
                <small>
                    #{prev_caption}
                </small>
            </a>
        </li>}
      end

      if page < page_count
        output << %Q{<li class="next">
            <a href="#{page_url(page+1)}">
                <small>
                    #{next_caption}
                </small>
                <span aria-hidden="true">
                    &rarr;
                </span>
            </a>
        </li>}
      end

      output << '</ul>'
    end

    def page_url(num)
      if num == 1
        @baseurl + '/index.html'
      else
        @baseurl + @path.sub(':num', num.to_s)
      end
    end
  end
end

Liquid::Template.register_tag('pager', Jekyll::PagerButton)

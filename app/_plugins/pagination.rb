module Jekyll
  class Pagination < Liquid::Tag
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

      prev_caption = site.data['i18n']['prev_page_pc']
      next_caption = site.data['i18n']['next_page_pc']

      output = '<ul class="pagination">'

      # Prev
      disabled, url = disable_or_url(page, 1, page-1)
      output << %Q{<li #{disabled}>
         <a href="#{url}" aria-label="Prev">
             <span aria-hidden="true">
                 &laquo;
             </span>
             <small>
                 #{prev_caption}
             </small>
         </a>
      </li>}

      # 1
      output << page_button(page, 1)


      show_first = page - 2
      show_last = page + 2

      show_first = 2 if show_first < 2
      show_last = page_count - 1 if show_last >= page_count

      if show_first > 3
        output << %Q{<li class="disabled">
            <a href="javascript:;">
                ...
            </a>
        </li>}
      elsif show_first == 3
        output << page_button(page, 2)
      end

      show_first.upto(show_last) do |i|
        output << page_button(page, i)
      end

      if show_last == page_count-2
        output << page_button(page, page_count-1)
      elsif show_last < page_count-2
        output << %Q{<li class="disabled">
            <a href="javascript:;">
                ...
            </a>
        </li>}
      end

      # the last
      output << page_button(page, page_count) if page_count > 1

      # Next
      disabled, url = disable_or_url(page, page_count, page+1)
      output << %Q{<li #{disabled}>
         <a href="#{url}" aria-label="Next">
             <small>
                 #{next_caption}
             </small>
             <span aria-hidden="true">
                 &raquo;
             </span>
         </a>
      </li>}

      output << '</ul>'
    end

    def page_url(num)
      if num == 1
        @baseurl + '/index.html'
      else
        @baseurl + @path.sub(':num', num.to_s)
      end
    end

    def disable_or_url(num, target, link)
      if num == target
        ['class="disabled"', 'javascript:;']
      else
        ['', page_url(link)]
      end
    end

    def page_button(num, target)
      if num == target
        active = 'class="active"'
        url = 'javascript:;'
      else
        active = ''
        url = page_url(target)
      end
      %Q{<li #{active}>
         <a href="#{url}">
             #{target}
         </a>
      </li>}
    end
  end
end

Liquid::Template.register_tag('pagination', Jekyll::Pagination)

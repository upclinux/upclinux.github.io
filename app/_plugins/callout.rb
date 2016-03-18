# Callout (Infobox)
#
# Usage:
#
# {% callout %}
# #### Title (optional)
#
# Content
# {% endcallout %}
#
# or
#
# {% callout style %}
# ...
#
# style: primary, success, info, warning, danger

module Jekyll
  class CalloutTag < Liquid::Block
    def initialize(tag_name, style, tokens)
      super
      @style = style.strip
    end

    def render(context)
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      style = @style.empty? ? 'callout-primary' : "callout-#{@style}"
      %Q{<div class="callout #{style}">#{converter.convert(super(context))}</div>}
    end
  end
end

Liquid::Template.register_tag('callout', Jekyll::CalloutTag)

import * as Handlebars from 'handlebars';

let category_tpl = `
<dd class="cat_count">{{totProjects}}</dd>
<dt><a href="#" class="only_cat">(only)<a/>
<span class="cb-wrapper">
	<a href="#" class="cb-icon"><input type="checkbox" class="toggle_cat cb-input" checked></a>
	<label class="cb-label">{{name}}</label>
</span></dt>`

export default Handlebars.compile(category_tpl);
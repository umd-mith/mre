import * as Backbone from 'backbone';
import * as _ from 'underscore';

class Project extends Backbone.Model {
	// Set all categories as active on creation
	parse(resp, options){
        if (!resp.research_sponsor) {
            resp.research_sponsor = ["No sponsor"];
        }        
		return resp;
	}
}

export default Project;
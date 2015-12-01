import $ from 'jquery';
import * as Backbone from 'backbone';
import ProjectView from './project-view.js';
import Events from '../utils/backbone-events.js';

class ProjectsView extends Backbone.View {
    initialize() {
        this.listenTo(Events, "projects:showOne", this.showProjectsFor);
        this.listenTo(Events, "projects:include", this.includeProjects);
        this.listenTo(Events, "projects:exclude", this.excludeProjects);
        this.listenTo(this, "projects:sort", this.sortProjects);
    }

    render(order) {

        if (!order) {
            this.collection.sort();
            for (let model of this.collection.models.reverse()) {
                this.$el.append(
                    (new ProjectView({model:model})).render()
                );
            }
        }
        else if (order == 'year_newest') {
            for (let model of this.collection.models.reverse()) {
                // If the project was not previously visible, hide it again.
                let wasAttached = model.get("attached");

                this.$el.append(
                    (new ProjectView({model:model})).render()
                );
                
                if (!wasAttached){
                    model.trigger("view:remove");
                }
            }
        }
        else {
            this.collection.sort();
            this.collection.each( (model) =>{
                // If the project was not previously visible, hide it again.
                let wasAttached = model.get("attached");

                this.$el.append(                    
                    (new ProjectView({model:model})).render()
                );
                
                if (!wasAttached){
                    model.trigger("view:remove");
                }
            });
        }
        
    }

    sortProjects(order) {
        this.$el.empty();
        this.render(order);
    }

    showProjectsFor(options) {
        this.collection.each(function (proj) {
            // Reset all
            proj.set("activeTopics", []);
            proj.set("activeTypes", []);
            if (proj.get("attached")){
                proj.trigger("view:remove");
            }
            // Then restore current category
            if (options.catType=="Topic"){
                if (proj.get("topic")) {
                    if (proj.get("topic").indexOf(options.catName) !== -1) {
                        // Record info about the topic
                        let activeSet = new Set(proj.get("activeTopics"));
                        activeSet.add(options.catName);
                        proj.set("activeTopics", Array.from(activeSet)); 
                        proj.trigger("view:restore");
                    }
                } 
            }
            else if (options.catType=="Type"){
                if (proj.get("research_type")) {
                    if (proj.get("research_type").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeTypes"));
                        activeSet.add(options.catName);
                        proj.set("activeTypes", Array.from(activeSet)); 
                        proj.trigger("view:restore");
                    }
                }   
            }     
            else if (options.catType=="Sponsor"){
                if (proj.get("research_sponsor")) {
                    if (proj.get("research_sponsor").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeSponsors"));
                        activeSet.add(options.catName);
                        proj.set("activeSponsors", Array.from(activeSet)); 
                        proj.trigger("view:restore");
                    }
                }   
            }           
            
        });
    }

    includeProjects(options) {
        this.collection.each(function (proj) {
            if (options.catType=="Topic"){
                if (proj.get("topic")) {
                    if (proj.get("topic").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeTopic"));
                        activeSet.add(options.catName);
                        proj.set("activeTopic", Array.from(activeSet)); 
                        if (!proj.get("attached")){
                            proj.trigger("view:restore");
                        }  
                    }
                } 
            }
            else if (options.catType=="Type"){
                if (proj.get("research_type")) {
                    if (proj.get("research_type").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeTypes"));
                        activeSet.add(options.catName);
                        proj.set("activeTypes", Array.from(activeSet)); 
                        if (!proj.get("attached")){
                            proj.trigger("view:restore");
                        }
                    }
                }   
            }
            else if (options.catType=="Sponsor"){
                if (proj.get("research_sponsor")) {
                    if (proj.get("research_sponsor").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeSponsors"));
                        activeSet.add(options.catName);
                        proj.set("activeSponsors", Array.from(activeSet)); 
                        if (!proj.get("attached")){
                            proj.trigger("view:restore");
                        }
                    }
                }   
            }
        });
    }

    excludeProjects(options) {

        this.collection.each(function (proj) {
            if (options.catType=="Topic"){
                if (proj.get("topic")) {
                    if (proj.get("topic").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeTopics"));
                        activeSet.delete(options.catName);
                        proj.set("activeTopics", Array.from(activeSet));
                        // Do not remove if other topics are active
                        if (proj.get("attached") && !activeSet.size){
                            proj.trigger("view:remove");
                        }  
                    }
                } 
            }
            else if (options.catType=="Type"){
                if (proj.get("research_type")) {
                    if (proj.get("research_type").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeTypes"));
                        activeSet.delete(options.catName);
                        proj.set("activeTypes", Array.from(activeSet));
                        if (proj.get("attached") && !activeSet.size){
                            proj.trigger("view:remove");
                        }
                    }
                }   
            }  
            else if (options.catType=="Sponsors"){
                if (proj.get("research_sponsors")) {
                    if (proj.get("research_sponsors").indexOf(options.catName) !== -1) {
                        // Record info about the type
                        let activeSet = new Set(proj.get("activeSponsors"));
                        activeSet.delete(options.catName);
                        proj.set("activeSponsors", Array.from(activeSet));
                        if (proj.get("attached") && !activeSet.size){
                            proj.trigger("view:remove");
                        }
                    }
                }   
            }  
        });
    }
}

export default ProjectsView;
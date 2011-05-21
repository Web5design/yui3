YUI.add("model-list",function(b){var i=b.JSON||i,f=b.Lang,h=b.Array,c="add",g="refresh",e="remove",d="update";function a(){a.superclass.constructor.apply(this,arguments);}b.ModelList=b.extend(a,b.Base,{model:null,initializer:function(k){k||(k={});var j=this.model=k.model||this.model;this.publish(c,{defaultFn:this._defAddFn});this.publish(g,{defaultFn:this._defRefreshFn});this.publish(e,{defaultFn:this._defRemoveFn});this.publish(d,{preventable:false});this.after([c,g,e],function(l){this.fire(d,{originEvent:l});});if(j){this.after("*:"+this.get("pk")+"Change",this._afterIdChange);}else{}this._clear();},add:function(n,k){var m,l,j;if(f.isArray(n)){m=[];for(l=0,j=n.length;l<j;++l){m.push(this._add(n[l],k));}return m;}else{return this._add(n,k);}},create:function(l,k,m){var j=this;if(typeof k==="function"){m=k;k={};}if(!(l instanceof b.Model)){l=new this.model(l);}return l.save(k,function(n){if(!n){j.add(l,k);}m&&m.apply(null,arguments);});},getByClientId:function(j){return this._clientIdMap[j]||null;},getById:function(j){return this._idMap[j]||null;},invoke:function(j){return h.invoke(this._items,j,h(arguments,1,true));},load:function(k,l){var j=this;if(typeof k==="function"){l=k;k={};}this.sync("read",k,function(n,m){if(!n){j.refresh(j.parse(m),k);}l&&l.apply(null,arguments);});return this;},map:function(j,k){return h.map(this._items,j,k);},parse:function(j){if(typeof j==="string"){if(i){try{return i.parse(j)||[];}catch(k){b.error("Failed to parse JSON response.");return null;}}else{b.error("Can't parse JSON response because the json-parse "+"module isn't loaded.");return null;}}return j||[];},refresh:function(l,j){j||(j={});var k=b.merge(j,{src:"refresh",models:h.map(l,function(m){return m instanceof b.Model?m:new this.model(m);},this)});j.silent?this._defRefreshFn(k):this.fire(g,k);return this;},remove:function(n,k){var l,j,m;if(f.isArray(n)){m=[];for(l=0,j=n.length;l<j;++l){m.push(this._remove(n[l],k));}return m;}else{return this._remove(n,k);}},sort:function(k){var j=this.comparator,m=this._items.concat(),l;if(!j){return this;}k||(k={});m.sort(function(o,n){var q=j(o),p=j(n);return q<p?-1:(q>p?1:0);});l=b.merge(k,{models:m,src:"sort"});k.silent?this._defRefreshFn(l):this.fire(g,l);return this;},sync:function(){var j=h(arguments,0,true).pop();if(typeof j==="function"){j();}},toArray:function(){return this._items.concat();},url:function(){return"";},_add:function(k,j){var l;j||(j={});if(!(k instanceof b.Model)){k=new this.model(k);}if(this._clientIdMap[k.get("clientId")]){b.error("Model already in list.");return;}l=b.merge(j,{index:this._findIndex(k),model:k});j.silent?this._defAddFn(l):this.fire(c,l);return k;},_attachList:function(j){if(j.list){j.list.remove(j);}j.list=this;j.addTarget(this);},_detachList:function(j){delete j.list;j.removeTarget(this);},_clear:function(){h.each(this._items,this._detachList,this);this._clientIdMap={};this._idMap={};this._items=[];},_findIndex:function(n){if(!this._items.length){return 0;}if(!this.comparator){return this._items.length;}var k=this.comparator,l=this._items,j=l.length,o=0,q=k(n),p,m;while(o<j){m=(o+j)/2;p=l[m];if(p&&k(p)<q){o=m+1;}else{j=m;}}return o;},_remove:function(l,k){var j=this.indexOf(l),m;k||(k={});if(j===-1){b.error("Model not in list.");return;}m=b.merge(k,{index:j,model:l});k.silent?this._defRemoveFn(m):this.fire(e,m);return l;},_afterIdChange:function(j){j.prevVal&&delete this._idMap[j.prevVal];j.newVal&&(this._idMap[j.newVal]=j.target);},_defAddFn:function(k){var j=k.model,l=j.get(j.get("pk"));this._clientIdMap[j.get("clientId")]=j;if(l){this._idMap[l]=j;}this._attachList(j);this._items.splice(k.index,0,j);},_defRefreshFn:function(j){if(j.src==="sort"){this._items=j.models.concat();return;}this._clear();if(j.models.length){this.add(j.models,{silent:true});}},_defRemoveFn:function(k){var j=k.model,l=j.get(j.get("pk"));this._detachList(j);delete this._clientIdMap[j.get("clientId")];if(l){delete this._idMap[l];}this._items.splice(k.index,1);}},{NAME:"modelList"});b.augment(a,b.ArrayList);b.ArrayList.addMethod(a.prototype,["get","getAsHTML","getAsURL","toJSON"]);},"@VERSION@",{requires:["array-extras","array-invoke","arraylist","base-build","model"]});
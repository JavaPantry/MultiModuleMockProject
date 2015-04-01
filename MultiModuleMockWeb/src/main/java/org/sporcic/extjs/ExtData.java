package org.sporcic.extjs;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * An ExtResponse subclass which contains a list of data, along with
 * a total count. This is usefully for working with ExtJS Stores so that
 * you don't need to build your own Map to return. The fields will be
 * serialized by Jackson JSON in the JSON format as long as you annotate
 * the controller method return value as @ResponseBody.
 */
public class ExtData extends ExtResponse {

    @JsonProperty("data")
    private final List<Object> data = new ArrayList<Object>();

    @JsonProperty("total")
    private long total = 0;
    
    // In case of paging table we need to return a total number of records, not just the number on a single page
    // in that we will override 'total' json property with a 'setTotal()' method
    private boolean overrideTotal = false;

	/**
     * Add a single Object to the data array
     * @param item the Object to add to the array
     */
    public void add(Object item) {

        if(item == null) return;

        if(item instanceof Collection) {

            for(Object object : (Collection) item) {
//            	replacePropertyNullValuesWithEmptyString(object);
                data.add(object);
                if (this.overrideTotal == false) {
                	total++;	
                }                
            }

        } else {
            data.add(item);
            if (this.overrideTotal == false) {
            	total++;	
            }             
        }
    }
    
    private Object replacePropertyNullValuesWithEmptyString(Object object) {
    	Class cls = object.getClass();
    	Field[] fields = cls.getDeclaredFields();
//    	for (Field field : fields) {
    	for (int i=0; i<fields.length; i++) {
//    		fields[i];
    	}
		return object;    	
    }
    
    /**
     * Get a number of records returned
     */
    public long getTotal() {
        return total;        
    }    
    
    public void setTotal(long total) {
    	this.overrideTotal = true;
		this.total = total;
	}    
}

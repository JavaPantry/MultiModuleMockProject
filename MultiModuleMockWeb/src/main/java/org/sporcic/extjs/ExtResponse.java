package org.sporcic.extjs;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Base class which represents a minimal payload to be returned to an ExtJS AJAX
 * request, containing the success flag and an optional message. These fields
 * will be serialized by Jackson JSON in the JSON format as long as you annotate
 * the controller method return value as @ResponseBody.
 */
public class ExtResponse {

	/**
	 * Simple Success response which can be used for custom ajax calls
	 */
	public final static ExtResponse SUCCESS = new ExtResponse(true, null);

	protected boolean success = false;
	
	protected String message = "";	

	protected String error = "";

	public ExtResponse() {
		// no-op constructor
	}

	public ExtResponse(boolean success) {
		this(success, null);
	}

	public ExtResponse(boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}	
}

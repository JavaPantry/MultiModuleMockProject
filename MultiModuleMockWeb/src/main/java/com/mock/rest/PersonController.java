package com.mock.rest;

import java.util.List;

import org.sporcic.extjs.ExtData;
import org.sporcic.extjs.ExtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mock.component.IPersonService;
/**
 * Described on http://www.concretepage.com/spring-4/spring-4-rest-web-service-json-example-tomcat
 *
 * hit
 * http://localhost:8080/MockRestBootExtJs/data/person?id=1
 * OR
 * http://localhost:8080/MockRestBootExtJs/data/persons
 * 
 * Add: jackson-binding and support class ExtResponse
 * 
 * @RequestMapping(method = RequestMethod.POST)
 * public @ResponseBody ExtResponse addContacts(@RequestBody Contact[] contacts) {
 *	logger.info("addContacts called");
 *	ExtData ret = new ExtData();
 *	List<Contact> updated = contactService.addContacts(contacts);
 *	ret.add(updated);
 *	ret.setSuccess(true);
 *	return ret;
 *	}
 *	v 0.1
 */
@RestController
@RequestMapping("/data")
public class PersonController {
	@Autowired
	private IPersonService personService;

	@RequestMapping("/person")
	public ExtResponse getPersonDetail(@RequestParam(value = "id",required = false,
	                                                    defaultValue = "0") Integer id) {
		Person p = personService.getPersonDetail(id);
        ExtData ret = new ExtData();
        ret.add(p);
        ret.setSuccess(true);
		return ret;
	}

	@RequestMapping("/persons")
	public ExtResponse getAll() {
        ExtData ret = new ExtData();
        List<Person> persons = personService.getAll();
        ret.add(persons);
        ret.setSuccess(true);
		return ret;
	}

}
package com.mock.component;

import java.util.List;

import com.mock.rest.Person;

public interface IPersonService {
  public Person 	getPersonDetail(Integer id);
  public Person[]	getPersons();
  public List<Person>	getAll();
}

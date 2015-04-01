package com.mock.component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

import com.mock.rest.Person;

@Component
public class PersonService implements IPersonService {
	private static String[] locations = {"Moscow","Minsk","Toronto","Berlin", "Paris","London","Budapest","Madrid","Mexico","Benjin", "Deli","Peru"};
	private static String[] firstNames = {"Alex","Igor","Henry","Hong", "Bohdan","Mike","Nancy","Eva","Ken","Bill", "Sarah","Dick"};
	private static String[] lastNames = {"Oharra","Ilutkin","Wu","Shmu", "Bink","Shmonk","Ho","Shmo","Liar","Shmuk", "Webber","Chadwick"};
	@Override
	public Person getPersonDetail(Integer id){
		Person p = new Person();
		p.setId(id);
		p.setLocation(locations[id%9]);
		p.setName(lastNames[id%9]+" "+firstNames[id%9]);
		return p;
	}

	@Override
	public Person[] getPersons() {
		List<Person> persons = getAll();
		Person[] personsArray = new Person[persons.size()];
		int i=0;
		for (Person person : persons) {
			personsArray[i++] = person;
			
		}
		return personsArray;
	}

	@Override
	public List<Person> getAll() {
		List<Person> persons = new ArrayList<Person>();
		for(int i=1; i<10; i++){
			Person p = new Person();
			p.setId(i);
			p.setLocation(locations[i%9]);
			p.setName(lastNames[i%9]+" "+firstNames[i%9]);
			persons.add(p);
		}
		return persons;
	}
}

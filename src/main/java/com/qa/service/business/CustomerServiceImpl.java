package com.qa.service.business;

import javax.inject.Inject;

import org.apache.log4j.Logger;

import com.qa.service.repository.CustomerRepository;

public class CustomerServiceImpl implements CustomerService{
	
	@Inject
	private CustomerRepository repo;
	
	private static final Logger LOGGER = Logger.getLogger(CustomerServiceImpl.class);

	@Override
	public String getCustomer(String USERNAME, String PASSWORD) {
		LOGGER.info("At Customer ServiceImpl - Get request - getCustomer");
		LOGGER.info(USERNAME + "----" + PASSWORD);
		return repo.getCustomer(USERNAME, PASSWORD);
	}
	
	@Override
	public String checkUniqueUsername(String USERNAME) {
		LOGGER.info("At customer serviceImpl - put request - checkUniqueUsername");
		LOGGER.info(USERNAME);
		return repo.checkUniqueUsername(USERNAME);
	}

	@Override
	public String addCustomer(String FIRST_NAME, String SECOND_NAME, String USERNAME, String PASSWORD) {
		LOGGER.info("At customer seviviceImpl - post request - addCustomer");
		LOGGER.info(FIRST_NAME + "---" + SECOND_NAME + "---" + USERNAME + "---" + PASSWORD);
		return repo.createCustomer(FIRST_NAME, SECOND_NAME, USERNAME, PASSWORD);
	}

}

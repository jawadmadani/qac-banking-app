package com.qa.intergration;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.log4j.Logger;

import com.qa.util.JSONUtil;
import com.qa.domain.Customer;
import com.qa.domain.Transaction;
import com.qa.service.business.TransactionService;

@Path("/customer/{CUS_ID}/account/{ACC_ID}")
public class TransactionEndpoint {
	
	@Inject
	private TransactionService service;
	
	@Inject
	private JSONUtil util;
	
	private static final Logger LOGGER = Logger.getLogger(TransactionEndpoint.class);
	
	@Path("/")
	@GET
	@Produces({ "transaction/json" })
	public String getTransaction(@PathParam("ACC_ID") Long ACC_ID) {
		LOGGER.info("At Transaction End Point - Get request - getTransaction");
		LOGGER.info("Account id: " + ACC_ID);
		return service.getAllTransactionStatement(ACC_ID);
	}
	
	@Path("/statement")
	@GET
	@Produces({ "transaction/json" })
	public String getTransactionStatement(@PathParam("ACC_ID") Long ACC_ID) {
		LOGGER.info("At Transaction End Point - Get request - getTransactionStatement");
		return service.getAllTransactionStatement(ACC_ID);
	}
	
	@Path("/balance")
	@GET
	@Produces( { "transaction/json" })
	public String getBalance(@PathParam("ACC_ID") Long ACC_ID) {
		LOGGER.info("At Transaction End Point - Get request - getBalance");
		return service.getBalance(ACC_ID);
	}
	
	public void setService(TransactionService service) {
		this.service = service;
	}
	
}

module.exports = (req, res, next) => {
	
	if (req.method ==='POST' && req.path === '/authentication/v1/sms-otp/session') {
		console.log()
		console.log('/authentication/v1/sms-otp/session headers:')
		console.log(req.headers)
		console.log('/authentication/v1/sms-otp/session body:')
		console.log(req.body)
		return res.status(201).send({ 
			status: 'IN_PROGRESS',
			errors: null,
			warnings: null
		});
	} else if (req.method ==='POST' && req.path === '/authentication/v1/sms-otp/session/validate') {
		console.log()
		console.log('/authentication/v1/sms-otp/session/validate headers:')
		console.log(req.headers)
		console.log('/authentication/v1/sms-otp/session/validate body:')
		console.log(req.body)
		return res.status(201).send({ 
			status: 'VALIDATED',
			errors: null,
			warnings: null
		});
	} else if (req.method ==='GET' && req.path === '/authentication/v1/auth-methods') {
		console.log()
		console.log('/authentication/v1/auth-methods headers:')
		console.log(req.headers)
		console.log('/authentication/v1/auth-methods body:')
		console.log(req.body)
		return res.status(201).send({ 
			authMethods: [
				'SMS_OTP',
				'CALL_CHALLENGE'
			]
		});
	} else if (req.method ==='GET' && req.path === '/authentication/v1/phone-numbers') {
		console.log()
		console.log('/authentication/v1/phone-numbers headers:')
		console.log(req.headers)
		console.log('/authentication/v1/phone-numbers body:')
		console.log(req.body)
		return res.status(201).send({ 
			phoneNumbers: [
			{
				id: 1,
				type: 'mobile',
				number: '07786767111'
			},
			{
				id: 2,
				type: 'mobile',
				number: '07786777222'
			},
			{
				id: 3,
				type: 'mobile',
				number: '07787788333'
			}
			]
		});
	} else {
		return res.status(404).send({
			error: 'Sorry, req.method: ' + req.method + ', req.path: ' + req.path + ' not found'});
			next();
	}
};
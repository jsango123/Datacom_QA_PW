Registration Page Test Automation 

High level Scenarios:
1.	Required Fields : Mandatory field validation 
2.	Field format validations  for email ,phone 
3.	Password complexities validation
4.	Check box 
5.	Optional fields – submit allowed 
6.	Verify the same email id cannot register twice
7.	Verify phone no do not allow other special characters or characters other than +
8.	Verify for the successful submission , the values are saved correctly 
9.	Verify duplicate registration is not allowed .

Defects :
1.	Last name mandatory – no validation ,can submit without entering last name 
2.	Email mandatory – no validations ,can submit form 
3.	Email format -no validation accepts all
4.	Accept T&C cannot be checked 
5.	Label typo : Phone number 
6.	Password should be masked 
7.	If no country selected ;no value should be displayed
8.	Phone  allows characters 
9.	Phone allows large no of digits should be restricted 
10.	First name is not mandatory 
11.	Mandatory fields or invalid fields should be highlighted on Submission
12.	Validator for lastname is not retrieving correct values (one character less )
13.	Validation for phone appends with NaN and for numbers the last no is increneted by 1 
14.	

Running Tests 
Git clone repo  
npm install 
npx playwright test 
npx playwright test show-report 



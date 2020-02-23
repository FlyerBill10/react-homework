import React, { Component } from "react";
import { Row, Col, FormGroup, FormControl, FormLabel, Button, FormText } from 'react-bootstrap';
import './register.sass';
import { isEmail, isEmpty, isLength} from './validator';
import MaskedFormControl from 'react-bootstrap-maskedinput';


class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            formData: {}, // Contains register form data
            errors: {}, // Contains registration field errors
            formSubmitted: false, // Indicates submit status of registration form
            loading: false, // Indicates npm instprogress state of registration form
            divWidth: {
                width: 600
            },
            addrLineWidth: {
                width: 450
            },
            stateWidth: {
                width: 50
            },
            zipWidth: {
                width: 150
            }
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        var strIn = value;
        strIn = strIn.replace(/_/g, ' ');
        formData[name] = strIn;

        this.setState({
            formData: formData
        });
    }

   

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        

         if (isEmpty(formData.firstname)) {
            errors.firstname = "First Name can't be blank";
         }

         if (isEmpty(formData.lastname)) {
            errors.lastname = "Last Name can't be blank";
         }

         if (isEmpty(formData.ssn)) {
            errors.ssn = "Social Security Number can't be blank";
         }

         if (isEmpty(formData.phone)) {
            errors.phone = "Telephone Number can't be blank";
         }


         if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

         if (isEmpty(formData.address1)) {
            errors.address1 = "Address Line 1 can't be blank";
        } else if (isLength(formData.address1,{ lt:4 })) {
            errors.address1 = "Address Line 1 invalid";
        }

        if (isEmpty(formData.cityName)) {
            errors.cityName = "City can't be blank";
        } else if (isLength(formData.cityName,{ lt:2 })) {
            errors.cityName = "City is invalid";
        }

        if (isEmpty(formData.stateVal)) {
            errors.stateVal = "State can't be blank";
        }
        else if (isLength(formData.stateVal,{ lt:2 })) {
            errors.stateVal = "State is invalid";
        }
        if (isEmpty(formData.zipCode)) {
            errors.zipCode = "Zip Code can't be blank";
        } else if (!isLength(formData.zipCode,{gte:5,trim:true})) {
            errors.zipCode = "Zip Code must be at least 5 digits";
        }
        
        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    register = (e) => {

        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
             const { formData } = this.state;
            var ssnStr = formData.ssn;
            ssnStr = "###-##-" + ssnStr.substr(ssnStr.length - 4);
            let   alertStr = "You are successfully registered as\n " 
                + formData.firstname + " " + formData.lastname + "\n"
                + formData.phone + " " + ssnStr + "\n"
                + formData.email + "\n"
                + formData.address1  + "\n"
                + formData.address2  + "\n"
                + formData.cityName + " " + formData.stateVal + "," + formData.zipCode; 
            
            alert(alertStr)
            window.location.reload()
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Register">
                <Row>
                    <form style={this.state.divWidth} onSubmit={this.register}>
                    <Row>
                    <h2>Registration Form</h2>
                    </Row>
                    <Row>
                            <Col>
                               <FormGroup controlId="firstname" validationState={ formSubmitted ? (errors.firstname ? 'error' : 'success') : null }>

                            <FormLabel class='required'>First Name</FormLabel>
                            <FormControl type="text" name="firstname" placeholder="First Name" onChange={this.handleInputChange} />
                        { errors.firstname &&
                            <FormText>{errors.firstname}</FormText>                            
                        }
                        </FormGroup>
                        </Col>
                        <Col>
                           <FormGroup controlId="lastname" validationState={ formSubmitted ? (errors.lastname ? 'error' : 'success') : null }>

                        <FormLabel  class='required'>Last Name</FormLabel>
                            <FormControl type="text" name="lastname" placeholder="Last Name" onChange={this.handleInputChange} />
                        { errors.lastname &&
                            <FormText>{errors.lastname}</FormText>
                        }
                        </FormGroup>
                        </Col>
                     </Row>
                    
                     
                     <Row><Col>
                
                              <FormGroup controlId="ssn" validationState={ formSubmitted ? (errors.ssn ? 'error' : 'success') : null }>
                            <FormLabel  class='required'>Social Security</FormLabel>
                            <FormControl type="password" maxLength="9" name="ssn" onChange={this.handleInputChange} />
                        { errors.ssn &&
                            <FormText>{errors.ssn}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        <Col>  
                         <FormGroup controlId="phone" validationState={ formSubmitted ? (errors.phone ? 'error' : 'success') : null }>
                            <FormLabel  class='required'>Telephone Number</FormLabel>
                            <MaskedFormControl type="text" name="phone" maskChar= " " mask='(111) 111-1111' onChange={this.handleInputChange} />
                        { errors.phone &&
                            <FormText>{errors.phone}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        </Row>
                        
                        <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <FormLabel  class='required'>Email</FormLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { errors.email &&
                            <FormText>{errors.email}</FormText>
                        }
                        </FormGroup>
                        <Row>
                            <Col>
                               <FormGroup controlId="address1" validationState={ formSubmitted ? (errors.address1 ? 'error' : 'success') : null }>
                        <FormLabel  class='required'>Address Line 1</FormLabel>
                            <FormControl type="text" name="address1" style={this.state.addrLineWidth} placeholder="Street Name" onChange={this.handleInputChange} />
                        { errors.address1 &&
                            <FormText>{errors.address1}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                               <FormGroup controlId="address2" validationState={ formSubmitted ? (errors.address2 ? 'error' : 'success') : null }>

                        <FormLabel >Address Line 2</FormLabel>
                            <FormControl type="text" name="address2" style={this.state.addrLineWidth} placeholder="Address Line 2" onChange={this.handleInputChange} />
                        { errors.address2 &&
                            <FormText>{errors.address1}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                               <FormGroup controlId="cityName" validationState={ formSubmitted ? (errors.address2 ? 'error' : 'success') : null }>

                        <FormLabel  class='required'>City</FormLabel>
                            <FormControl type="text" name="cityName" placeholder="City" onChange={this.handleInputChange} />
                        { errors.cityName &&
                            <FormText>{errors.cityName}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        <Col>
                               <FormGroup controlId="stateVal" validationState={ formSubmitted ? (errors.address2 ? 'error' : 'success') : null }>

                        <FormLabel  class='required'>State</FormLabel>
                            <MaskedFormControl type="text" mask='AA' maxlength="2" maskChar= " " name="stateVal" style={this.state.stateWidth} placeholder="ST" onChange={this.handleInputChange} />
                        { errors.stateVal &&
                            <FormText>{errors.stateVal}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        <Col>
                               <FormGroup controlId="zipCode" validationState={ formSubmitted ? (errors.zipCode ? 'error' : 'success') : null }>

                        <FormLabel  class='required'>Zip Code</FormLabel>
                            <MaskedFormControl type="text" minLength='5' mask='11111-1111'placeholderChar=' ' name="zipCode" style={this.state.zipWidth} onChange={this.handleInputChange} />
                        { errors.zipCode &&
                            <FormText>{errors.zipCode}</FormText>
                        }
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                            <FormGroup controlId="submitButton">
                         <Button type="submit" bsStyle="primary">Register</Button>
                         </FormGroup>
                         </Row>
                         <Row>
                            <FormGroup controlId="requiredText">
                        <FormText>Fields marked with an * are required</FormText>
                        </FormGroup>
                         </Row>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Register;
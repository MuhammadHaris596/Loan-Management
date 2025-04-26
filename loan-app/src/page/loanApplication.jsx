import React, { useState } from "react";
import { Box, Button, MenuItem, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import Swal from 'sweetalert2'
import { supabase } from "../utils/config";
import { useNavigate } from "react-router-dom"


const LoanFormStepper = () => {
  const steps = ["Personal Info", "Income Details", "Loan Info", "Review"];
  const [activeStep, setActiveStep] = useState(0);

  const [personalInfo, setPersonalInfo] = useState({
    birthYear: '',
    month: '',
    day: '',
    gender: '',
    sin: '',
    address: ''
  });

  const [incomeInfo, setIncomeInfo] = useState({
    incomeSource: '',
    bank: '',
    frequency: '',
    nextPay: '',
    consumerProposal: '',
    bankruptcy: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep0 = () => {
    const newErrors = {};
    if (!personalInfo.birthYear) newErrors.birthYear = 'Birth Year is required';
    if (!personalInfo.month) newErrors.month = 'Month is required';
    if (!personalInfo.day) newErrors.day = 'Day is required';
    if (!personalInfo.gender) newErrors.gender = 'Gender is required';
    if (!personalInfo.sin) newErrors.sin = 'SIN is required';
    if (!personalInfo.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!incomeInfo.incomeSource) newErrors.incomeSource = 'Income source is required';
    if (!incomeInfo.bank) newErrors.bank = 'Bank is required';
    if (!incomeInfo.frequency) newErrors.frequency = 'Frequency is required';
    if (!incomeInfo.nextPay) newErrors.nextPay = 'Next pay date is required';
    if (!incomeInfo.consumerProposal) newErrors.consumerProposal = 'Required';
    if (!incomeInfo.bankruptcy) newErrors.bankruptcy = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;

    if (activeStep === 0) isValid = validateStep0();
    else if (activeStep === 1) isValid = validateStep1();

    if (isValid) {
      if (activeStep === steps.length - 1) {
        Swal.fire({
          title: "Successfully send loan Application!",
          icon: "success"
        });
        return;
      }
      setActiveStep((prev) => prev + 1);
    }
  };

  const pageNavigate = useNavigate()

  async function LoanDetails(){

    const { birthYear, month, day, gender, sin, address } = personalInfo;
    const { incomeSource, bank, frequency, nextPay, consumerProposal, bankruptcy } = incomeInfo;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


    try{
      const { data,error } = await supabase
      .from('LoanRequest')
      .insert({ id: currentUser.userId,birthYear :birthYear,birthMonth:month,birthDate: day,gender:gender,socialInsuranNoce:sin,Adress:address
        ,incomeSource:incomeSource ,bank:bank,payFrequency:frequency,nextPayDate:nextPay,bankrupcty:bankruptcy
      })

      if(error) throw error

      if(data){
        console.log(data)
      }
    }catch(error){
      console.log(error.message)
    }
  }
  

  return (
    <Box component="main" sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
      <Box sx={{ backgroundColor: '#edf7f6' }} className="mt-5 rounded-4 p-4">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="form-wrapper mt-4">
          {/* Step 0 - Personal Info */}
          {activeStep === 0 && (
            <Box className="step-content">
              <Typography variant="h5" fontWeight="bold">Personal Information</Typography>
              <div className="row g-4 mt-3">
                <div className="col-md-4">
                  <TextField
                    label="Birth Year"
                    fullWidth
                    value={personalInfo.birthYear}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, birthYear: e.target.value })}
                    error={!!errors.birthYear}
                    helperText={errors.birthYear}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="Month"
                    fullWidth
                    value={personalInfo.month}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, month: e.target.value })}
                    error={!!errors.month}
                    helperText={errors.month}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="Day"
                    fullWidth
                    value={personalInfo.day}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, day: e.target.value })}
                    error={!!errors.day}
                    helperText={errors.day}
                  />
                </div>
              </div>

              <TextField
                select
                label="Gender"
                fullWidth
                className="mt-4"
                value={personalInfo.gender}
                onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                label="SIN"
                fullWidth
                className="mt-4"
                value={personalInfo.sin}
                onChange={(e) => setPersonalInfo({ ...personalInfo, sin: e.target.value })}
                error={!!errors.sin}
                helperText={errors.sin}
              />

              <TextField
                label="Address"
                fullWidth
                className="mt-4"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Box>
          )}

          {/* Step 1 - Income Info */}
          {activeStep === 1 && (
            <Box className="step-content">
              <Typography variant="h5" fontWeight="bold">Income Information</Typography>

              <TextField
                select
                label="Income Source"
                fullWidth
                className="mt-3"
                value={incomeInfo.incomeSource}
                onChange={(e) => setIncomeInfo({ ...incomeInfo, incomeSource: e.target.value })}
                error={!!errors.incomeSource}
                helperText={errors.incomeSource}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Employment">Employment</MenuItem>
                <MenuItem value="Self-employed">Self-employed</MenuItem>
              </TextField>

              <TextField
                select
                label="Bank"
                fullWidth
                className="mt-3"
                value={incomeInfo.bank}
                onChange={(e) => setIncomeInfo({ ...incomeInfo, bank: e.target.value })}
                error={!!errors.bank}
                helperText={errors.bank}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="First National Bank">First National Bank</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                select
                label="Pay Frequency"
                fullWidth
                className="mt-3"
                value={incomeInfo.frequency}
                onChange={(e) => setIncomeInfo({ ...incomeInfo, frequency: e.target.value })}
                error={!!errors.frequency}
                helperText={errors.frequency}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Bi-weekly">Bi-weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </TextField>

              <TextField
                type="date"
                label="Next Pay Date"
                fullWidth
                className="mt-3"
                InputLabelProps={{ shrink: true }}
                value={incomeInfo.nextPay}
                onChange={(e) => setIncomeInfo({ ...incomeInfo, nextPay: e.target.value })}
                error={!!errors.nextPay}
                helperText={errors.nextPay}
              />

              <Typography className="mt-3 mb-1">Made a consumer proposal in last 6 months?</Typography>
              <div className="d-flex gap-3">
                <label><input type="radio" value="Yes" name="proposal" onChange={(e) => setIncomeInfo({ ...incomeInfo, consumerProposal: e.target.value })} checked={incomeInfo.consumerProposal === "Yes"} /> Yes</label>
                <label><input type="radio" value="No" name="proposal" onChange={(e) => setIncomeInfo({ ...incomeInfo, consumerProposal: e.target.value })} checked={incomeInfo.consumerProposal === "No"} /> No</label>
              </div>
              {errors.consumerProposal && <div className="text-danger">{errors.consumerProposal}</div>}

              <Typography className="mt-3 mb-1">Ever filed bankruptcy?</Typography>
              <div className="d-flex gap-3">
                <label><input type="radio" value="Yes" name="bankruptcy" onChange={(e) => setIncomeInfo({ ...incomeInfo, bankruptcy: e.target.value })} checked={incomeInfo.bankruptcy === "Yes"} /> Yes</label>
                <label><input type="radio" value="No" name="bankruptcy" onChange={(e) => setIncomeInfo({ ...incomeInfo, bankruptcy: e.target.value })} checked={incomeInfo.bankruptcy === "No"} /> No</label>
              </div>
              {errors.bankruptcy && <div className="text-danger">{errors.bankruptcy}</div>}
            </Box>
          )}

          {/* Step 2 - Loan Info (placeholder) */}
          {activeStep === 2 && (
            <Box className="step-content">
              <Typography variant="h5" fontWeight="bold">Loan Info</Typography>
              <Typography className="mt-3">[Loan details form goes here...]</Typography>
            </Box>
          )}

          {/* Step 3 - Review */}
          {activeStep === 3 && (
            <Box className="step-content">
              <Typography variant="h5" fontWeight="bold">Review & Submit</Typography>
              <Typography className="mt-3">Everything looks good? Click submit to complete.</Typography>
            </Box>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              Previous
            </Button>

          
            <Button 
              variant="contained"
              onClick={()=>{
                const isFinalStep = activeStep === steps.length - 1;
                if (isFinalStep) {
                  LoanDetails();
                  setTimeout(() => {
                    pageNavigate("/dashboard"); 
                  }, 1000)
                }
                handleNext();
               
              }}
              
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default LoanFormStepper;

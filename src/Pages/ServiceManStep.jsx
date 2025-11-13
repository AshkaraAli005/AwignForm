import React, { useState } from 'react'
import ExServicemanStep from '../Components/Steppers/ExServicemanStep';
import { Card } from '../Components/Ui/card';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { Button } from '../Components/Ui/button';
import { setHasCompletedExServiceman, setHasSelectedRole } from '../Store/formSlice';
import AwignLogo from "../assets/AwignLogo.png";
import { cn } from "../lib/utils";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { updateAwignFormData } from '../services/api';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


const ServiceManStep = () => {
    const dispatch = useAppDispatch()
    const formData = useAppSelector((state) => state.form);
    const {id} = useParams()
    const [isButtonLoading , setIsButtonLoading] = useState(false)
  return (
          <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}

        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-accent/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header */}
                <header id="main-header" className="relative border-b border-border/50 backdrop-blur-xl bg-card/50  top-0 z-30">
                 <div className="container mx-2 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                     <img src={AwignLogo} height={"50px"} width={50} alt="Awign Logo" />
                      <div>
                        <h1 className="text-lg md:text-xl font-bold gradient-text">Awign Portal</h1>
                        <p className="text-sm text-muted-foreground">Pre-step: Service Status</p>
                      </div>
                    </div>
                    {/* <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-muted-foreground">Auto-saving</span>
                    </div> */}
                  </div>
                </div>
              </header>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="shadow-modern border-2 border-border/50 rounded-3xl overflow-hidden backdrop-blur-xl bg-card/80 animate-scale-in">
            <div className="relative gradient-primary p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-10" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-2">Ex-Serviceman Status</h2>
                <p className="text-white/80 text-sm">Please provide your ex-serviceman status</p>
              </div>
            </div>

            <div className="p-8">
              <ExServicemanStep />
            </div>
          </Card>

          <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => {dispatch(setHasSelectedRole(false)); window.scrollTo({ top: 0, behavior: "smooth" });}}
            className={cn(
              "h-12 px-6 rounded-xl border-2 font-semibold transition-all duration-300",
              "hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
            <Button
              onClick={() => {
                setIsButtonLoading(true)   
             updateAwignFormData(`/${id}`, { exServiceman: formData.exServiceman }).then(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              dispatch(setHasCompletedExServiceman(true))
              setIsButtonLoading(false)
             }).catch((error) => {
              console.log(error);
              setIsButtonLoading(false)
             })
            }}
            disabled={isButtonLoading}
              className={cn(
                "h-12 px-8 rounded-xl gradient-primary text-white font-bold shadow-glow",
                "hover:scale-105 transition-all duration-300 hover:shadow-xl border-0"
              )}
            >
            {isButtonLoading &&     <CircularProgress
      size={20}
      color="inherit"
      sx={{
        animation: "none !important", // optional
        marginRight: "8px",
      }}
    />}
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
  )
}

export default ServiceManStep
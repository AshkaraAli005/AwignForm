
import {
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";

import { Badge } from "../Components/Ui/badge";
import { Separator } from "../Components/Ui/separator";
import { useRef } from "react";

 
 export const getVerificationRes = (verifications) => {
      if (!verifications || verifications.length === 0) {
    return <p>No verifications available.</p>;
  }
  
      const basicDetailsRef = useRef(null);
      const qualificationRef = useRef(null);
      const aadhaarRef = useRef(null);
      const panCardRef = useRef(null);
      const addressRef = useRef(null);
      const neighbourRef = useRef(null);
    return(
       <div>
            <div className="">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
              </div>
              <div className="space-y-4">
                {verifications
                  .filter((v) => !v.match)
                  .map((v, i) => {
                    const getFieldSection = (fieldName) => {
                      if (fieldName.toLowerCase().includes("full name")) {
                        return {
                          ref: basicDetailsRef,
                          sectionId: "basic",
                          fieldKey: "fullName",
                        };
                      }
                      if (
                        fieldName.toLowerCase().includes("date of birth") ||
                        fieldName.toLowerCase().includes("dob")
                      ) {
                        return {
                          ref: basicDetailsRef,
                          sectionId: "basic",
                          fieldKey: "dateOfBirth",
                        };
                      }
                      if (fieldName.toLowerCase().includes("pan")) {
                        return {
                          ref: panCardRef,
                          sectionId: "panCard",
                          fieldKey: "panCardNumber",
                        };
                      }
                      if (fieldName.toLowerCase().includes("aadhaar")) {
                        return {
                          ref: aadhaarRef,
                          sectionId: "aadhaar",
                          fieldKey: "",
                        };
                      }
                      return {
                        ref: basicDetailsRef,
                        sectionId: "basic",
                        fieldKey: "fullName",
                      };
                    };
    
                    const fieldSection = getFieldSection(v.field);
    
                    {/* const scrollToField = () => {
                      if (fieldSection.ref.current) {
                        fieldSection.ref.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        setHighlightedSection(
                          `${fieldSection.sectionId}-${fieldSection.fieldKey}`
                        );
                      }
                    }; */}
    
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/50 transition-all
                       border-2 border-orange-500/50 backdrop-blur-xl bg-orange-500/5
                        "
                        // onClick={scrollToField}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{v.field}</p>
                            <p className="text-sm text-muted-foreground">
                              From {v.document}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-orange-500 text-orange-500"
                          >
                            {v.matchPercentage}% match
                          </Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              You entered:
                            </p>
                            <p className="font-semibold">{v.value}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Document shows:
                            </p>
                            <p className="font-semibold">{v.documentValue}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>)}
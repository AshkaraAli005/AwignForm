import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Label } from "../../Components/Ui/label";
import { RadioGroup, RadioGroupItem } from "../../Components/Ui/radio-group";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateDisclaimer } from "../../Store/formSlice";
import { Card } from "../../Components/Ui/card";
import { Alert, AlertDescription } from "../../Components/Ui/alert";

const DisclaimerStep = () => {
  const dispatch = useAppDispatch();
  const disclaimer = useAppSelector((state) => state.form.disclaimer);

  return (
    <div className="space-y-6">
      {/* Header Disclaimer Card */}
      <Card className="p-6 bg-orange-500/5 border border-orange-500/30">
        <div className="flex items-start gap-3 ">
          <AlertTriangle className="w-6 h-6 text-orange-500  flex-shrink-0" />
          <h3 className="font-bold text-lg">Important Disclaimer</h3>
        </div>
      </Card>

      {/* Disclaimer Text Block */}
      <Alert className="bg-card border-border">
        <AlertDescription className="space-y-4 text-sm">
          <div className="space-y-2">
            <p>
              <span className="font-semibold">1.</span> Do not submit multiple
              onboarding requests — this will lead to auto rejection as duplicate.
              <span className="block mt-1 text-muted-foreground italic">
                एक से ज्यादा onboarding request submit मत करना, इससे duplicate के रूप में rejection हो जाएगी।
              </span>
            </p>

            <p>
              <span className="font-semibold">2.</span> Please verify all the details
              before final submission to avoid rejection.
              <span className="block mt-1 text-muted-foreground italic">
                अस्वीकृति से बचने के लिए अंतिम submission से पहले सभी विवरणों को सत्यापित करें।
              </span>
            </p>

            <p>
              <span className="font-semibold">3.</span> The team will contact via
              Phone, Email, or WhatsApp in case of any discrepancies.
              <span className="block mt-1 text-muted-foreground italic">
                यदि कोई विसंगतियां है तो टीम आपसे Phone, Email या WhatsApp के माध्यम से संपर्क करेगी।
              </span>
            </p>

            <p>
              <span className="font-semibold">4.</span> A background check will be
              performed once you are shortlisted and meet the eligibility.
              <span className="block mt-1 text-muted-foreground italic">
                यदि आप चुने गए हो और पात्रता को पूरा करते है तो आपकी background check की जाएगी।
              </span>
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Quality & Verification Info */}
      <Card className="p-6 bg-secondary/30 border border-border/50">
        <h4 className="font-semibold mb-3">
          Quality Check & Background Verification
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p>
              The details provided must be legit. The originality of documents will
              be verified.
              <span className="block mt-1 text-muted-foreground italic">
                प्रदान की गई जानकारी सही होनी चाहिए। दस्तावेजों की मौलिकता की जाँच की जाएगी।
              </span>
            </p>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p>
              Shortlisting will be done if you adhere to the requirements and are
              eligible for the role.
              <span className="block mt-1 text-muted-foreground italic">
                यदि आप आवश्यकताओं का पालन करते है और भूमिका के लिए पात्र है, तो shortlisting की जाएगी।
              </span>
            </p>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p>
              Background check will be performed once you are shortlisted and meet
              the eligibility.
              <span className="block mt-1 text-muted-foreground italic">
                यदि आप चुने गए हो और पात्रता को पूरा करते है तो आपकी background check की जाएगी।
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* Error Reporting */}
      <Alert className="bg-red-500/5 border border-red-500/30">
        <AlertDescription className="text-sm">
          <p className="font-semibold">
            To Report Error: 📧 enrollment@awign.com
          </p>
        </AlertDescription>
      </Alert>

      {/* Proceed Radio Group */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          Proceed
          <span className="text-destructive">*</span>
        </Label>

        <RadioGroup
          value={disclaimer.proceed}
          onValueChange={(value) =>
            dispatch(updateDisclaimer({ proceed: value }))
          }
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="cursor-pointer font-medium flex-1">
              Yes
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="cursor-pointer font-medium flex-1">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DisclaimerStep;

import { Upload, X, FileCheck, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

const FileUpload = ({
  label,
  hint,
  maxSize = "5MB",
  onFileSelect,
  accept = "image/*",
  required = false,
  value = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(value);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    onFileSelect(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);
  };

  useEffect(() => {
    if (value && value !== selectedFile) {
      setSelectedFile(value);
      if (value.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          a;
        };
        reader.readAsDataURL(value);
      }
    }
  }, [value]);
  return (
    <div className="space-y-3 animate-fade-in">
      <label className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
          <Upload className="w-4 h-4 text-white" />
        </div>
        <span>{label}</span>
        {required && <span className="text-destructive text-base">*</span>}
      </label>
      {hint && (
        <p className="text-xs text-muted-foreground leading-relaxed pl-10">
          {hint}
        </p>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300",
          "bg-gradient-to-br from-secondary/50 to-secondary/30",
          isDragging && "border-primary bg-primary/5 scale-[1.02]",
          !isDragging && "border-border hover:border-primary/50 hover:shadow-lg"
        )}
      >
        {!selectedFile ? (
          <label className="cursor-pointer flex flex-col items-center gap-4 group">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 gradient-primary opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            </div>

            <div className="text-center space-y-2">
              <p className="text-base font-semibold gradient-text">
                Click to upload or drag & drop
              </p>
              <p className="text-sm text-muted-foreground">
                Supported: Images only
              </p>
              <p className="text-xs text-muted-foreground">
                Maximum file size: {maxSize}
              </p>
            </div>

            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border shadow-sm animate-scale-in">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-xl shadow-md ring-2 ring-primary/20"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {selectedFile.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <FileCheck className="w-3 h-3" />
                    <span className="text-xs font-medium">Uploaded</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="p-2.5 hover:bg-destructive/10 rounded-xl transition-all duration-200 group flex-shrink-0"
            >
              <X className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

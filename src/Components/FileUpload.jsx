import { Upload, X, FileCheck, Image as ImageIcon,AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { FilePreview } from "../utils/commonFunctions";
import { validateImageFile, validateDocumentFile, formatFileSize } from "../utils/fileValidation";

const FileUpload = ({
  label,
  hint,
  onFileSelect,
  accept = "image/*",
  required = false,
  multiple = false,
  validationType = "image",
  value ,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (files) => {
    if (!files || files.length === 0) {
      setSelectedFiles([]);
      setPreviews([]);
      setError(null);
      onFileSelect(null);
      return;
    }

    const fileArray = Array.from(files);
    const validationFunction =
      validationType === "image" ? validateImageFile : validateDocumentFile;

    // Validate all files
    const validationResults = fileArray.map(validationFunction);
    const firstError = validationResults.find((result) => !result.isValid);

    if (firstError) {
      setError(firstError.error || "Invalid file");
      setSelectedFiles([]);
      setPreviews([]);
      onFileSelect(null);
      return;
    }

    setError(null);

    if (multiple) {
      setSelectedFiles(fileArray);
      onFileSelect(fileArray);
    } else {
      setSelectedFiles([fileArray[0]]);
      onFileSelect(fileArray[0]);
    }

    // Generate previews for images
    const newPreviews = [];
    fileArray.forEach((file) => {
      if (file?.type?.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === fileArray.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews.push("");
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setError(null);

    if (newFiles.length === 0) {
      onFileSelect(null);
    } else if (multiple) {
      onFileSelect(newFiles);
    } else {
      onFileSelect(newFiles[0]);
    }
  };

  const maxSizeText =
    validationType === "image"
      ? "Images only (PNG, JPG, WEBP) - Max 5MB"
      : "Images or PDF - Max 5MB per file";

   useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      setSelectedFiles(files);
      
      // Generate previews for existing files
      const newPreviews = [];
      files.forEach((file) => {
        if (file?.type?.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result);
            if (newPreviews.length === files.length) {
              setPreviews(newPreviews);
            }
          };
          reader.readAsDataURL(file);
        } else {
          newPreviews.push('');
        }
      });
    }
  }, [value]);
  return (
    <div className="space-y-3 animate-fade-in">
    <div>
      <label className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
          <Upload className="w-4 h-4 text-white" />
        </div>
        <span>{label}</span>
        {required && <span className="text-destructive text-base">*</span>}
      </label>
      {hint && (
        <p className="text-xs text-muted-foreground leading-relaxed pl-10">{hint}</p>
      )}
</div>
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
        {selectedFiles.length === 0 ? (
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
              <p className="text-sm text-muted-foreground">{maxSizeText}</p>
              {multiple && (
                <p className="text-xs text-muted-foreground font-medium">
                  Multiple files allowed
                </p>
              )}
            </div>

            <input
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </label>
        ) : (
          <div className="space-y-3">
            {selectedFiles.map((file, index) => (
              multiple ? <div
                key={index}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border shadow-sm animate-scale-in"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {previews[index] ? (
                    <div className="relative group">
                      <img
                        src={previews[index]}
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
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <FileCheck className="w-3 h-3" />
                        <span className="text-xs font-medium">Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2.5 hover:bg-destructive/10 rounded-xl transition-all duration-200 group flex-shrink-0"
                >
                  <X className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform" />
                </button>
              </div>: <FilePreview file={file} label={file.label} handleRemove={() => handleRemove(0)} />
            ))}

            {multiple && (
              <label className="cursor-pointer flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 hover:bg-secondary/20 transition-all">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">
                  Add more files
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept={accept}
                  multiple={multiple}
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFilesArray = Array.from(e.target.files);
                      const validationFunction = validationType === 'image' ? validateImageFile : validateDocumentFile;
                      
                      // Validate new files
                      const validationResults = newFilesArray.map(validationFunction);
                      const firstError = validationResults.find(result => !result.isValid);
                      
                      if (firstError) {
                        setError(firstError.error || 'Invalid file');
                        e.target.value = '';
                        return;
                      }

                      setError(null);
                      
                      // Append to existing files
                      const updatedFiles = [...selectedFiles, ...newFilesArray];
                      setSelectedFiles(updatedFiles);
                      onFileSelect(updatedFiles);

                      // Generate previews for new files
                      newFilesArray.forEach((file) => {
                        if (file?.type?.startsWith('image/')) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPreviews(prev => [...prev, reader.result]);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setPreviews(prev => [...prev, '']);
                        }
                      });

                      e.target.value = '';                    }
                  }}
                />
              </label>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl animate-scale-in">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

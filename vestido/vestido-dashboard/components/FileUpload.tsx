import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useR2Upload, makeUploadKey } from '@vestido-ecommerce/r2';
import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormField } from '@vestido-ecommerce/shadcn-ui/form';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { clsx } from 'clsx';

type FileUploadProps = {
  label: string;
  keyPrefix: string;
  value?: string;
  onComplete?: (key: string | null) => void;
  onError?: () => void;
  className?: string;
};

const FileUpload: FC<FileUploadProps> = (props) => {
  const { label, keyPrefix: targetKey, onComplete, value } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [file, setSelectedFile] = useState<File | null>(null);
  const [uploadedKeys, setUploaded] = useState<string[]>([]);

  const key = useMemo(
    () => (file !== null ? makeUploadKey(targetKey, file) : null),
    [targetKey, file]
  );

  const { data: uploadStatus } = useR2Upload({
    key: key && uploadedKeys.includes(key) ? null : key,
    fileContents: file,
  });

  useEffect(() => {
    if (uploadStatus?.uploadDone) {
      onComplete?.(key);
      setUploaded((prev) => [...prev, key!]);
      if (ref.current) {
        // Clear selected files
        ref.current.value = '';
      }
    }
  }, [key, onComplete, uploadStatus]);

  useEffect(() => {
    const _input = ref.current;
    if (!_input) {
      return;
    }

    const handleChange = (e: Event) => {
      const files = Array.from(_input.files ?? []);
      if (!files.length) {
        console.info('No File Selected');
        return;
      }
      setSelectedFile(files[0]);
    };

    _input.addEventListener('change', handleChange);

    return () => _input.removeEventListener('change', handleChange);
  }, []);

  const showFileDialog = () => {
    ref.current?.click();
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between border border-4 border-black-500 border-dashed',
        props.className
      )}
    >
      <div className="flex flex-col items-start">
        <h4 className="text-sm font-medium flex flex-col items-center justify-center p-4">
          {label}
        </h4>
        {value && <span className="text-xs text-subtitle">{value}</span>}
        {uploadStatus && <span>Uploading {uploadStatus.progress}%</span>}
        <input ref={ref} type="file" hidden />
      </div>
      {value ? (
        <Button type="button" size="icon" onClick={() => onComplete?.(null)}>
          <FaTrashAlt className="text-xl text-danger" />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={showFileDialog}
          disabled={!!uploadStatus}
        >
          <FaCloudUploadAlt className="text-xl" />
        </Button>
      )}
    </div>
  );
};

type FileUploadElementProps<T extends FieldValues = FieldValues> = Omit<
  FileUploadProps,
  'value' | 'onComplete' | 'onError'
> & {
  name: FieldPath<T>;
};

export const FileUploadElement: FC<FileUploadElementProps> = (props) => {
  return (
    <FormField
      name={props.name}
      render={({ field }) => {
        return (
          <FileUpload
            {...props}
            value={field.value}
            onComplete={(key) => {
              field.onChange(key);
            }}
            onError={() => {
              field.onChange(null);
            }}
          />
        );
      }}
    />
  );
};

export default FileUpload;

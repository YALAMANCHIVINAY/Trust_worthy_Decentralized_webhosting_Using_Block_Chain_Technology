import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE, FILE_CATEGORIES } from './constants';
import { getFileExtension } from './formatters';

/**
 * Validate if file type is supported
 * @param {File} file - File to validate
 * @returns {boolean} True if supported
 */
export const isValidFileType = (file) => {
  const extension = getFileExtension(file.name);
  return SUPPORTED_FILE_TYPES.includes(extension);
};

/**
 * Validate if file size is within limit
 * @param {File} file - File to validate
 * @returns {boolean} True if within limit
 */
export const isValidFileSize = (file) => {
  return file.size <= MAX_FILE_SIZE;
};

/**
 * Check if files include at least one HTML file
 * @param {File[]} files - Array of files
 * @returns {boolean} True if HTML file exists
 */
export const hasHTMLFile = (files) => {
  return files.some(file => {
    const ext = getFileExtension(file.name);
    return FILE_CATEGORIES.html.includes(ext);
  });
};

/**
 * Validate array of files
 * @param {File[]} files - Array of files to validate
 * @returns {Object} Validation result with errors
 */
export const validateFiles = (files) => {
  const errors = [];
  
  if (!files || files.length === 0) {
    errors.push('Please select at least one file');
    return { isValid: false, errors };
  }

  // Check for HTML file
  if (!hasHTMLFile(files)) {
    errors.push('At least one HTML file is required');
  }

  // Validate each file
  let totalSize = 0;
  const invalidFiles = [];
  const oversizedFiles = [];

  files.forEach(file => {
    totalSize += file.size;

    if (!isValidFileType(file)) {
      invalidFiles.push(file.name);
    }

    if (!isValidFileSize(file)) {
      oversizedFiles.push(file.name);
    }
  });

  if (invalidFiles.length > 0) {
    errors.push(`Unsupported file types: ${invalidFiles.join(', ')}`);
  }

  if (oversizedFiles.length > 0) {
    errors.push(`Files exceed size limit: ${oversizedFiles.join(', ')}`);
  }

  if (totalSize > MAX_FILE_SIZE) {
    errors.push(`Total file size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    totalSize
  };
};

/**
 * Categorize files by type
 * @param {File[]} files - Array of files
 * @returns {Object} Files categorized by type
 */
export const categorizeFiles = (files) => {
  const categorized = {
    html: [],
    styles: [],
    scripts: [],
    images: [],
    fonts: [],
    archives: [],
    other: []
  };

  files.forEach(file => {
    const ext = getFileExtension(file.name);
    let categorized_flag = false;

    for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
      if (extensions.includes(ext)) {
        categorized[category].push(file);
        categorized_flag = true;
        break;
      }
    }

    if (!categorized_flag) {
      categorized.other.push(file);
    }
  });

  return categorized;
};

/**
 * Extract files from zip archive
 * @param {File} zipFile - Zip file
 * @returns {Promise<File[]>} Array of extracted files
 */
export const extractZipFiles = async (zipFile) => {
  // This would require a library like JSZip
  // For now, return empty array as placeholder
  console.warn('Zip extraction not implemented yet');
  return [];
};

/**
 * Prepare files for upload
 * @param {File[]} files - Array of files
 * @returns {FormData} FormData object ready for upload
 */
export const prepareFilesForUpload = (files) => {
  const formData = new FormData();
  
  files.forEach((file, index) => {
    formData.append(`file${index}`, file, file.name);
  });

  return formData;
};

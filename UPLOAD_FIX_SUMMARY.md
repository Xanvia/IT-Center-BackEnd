# Image Upload Fix for All Upload Endpoints

## Issues Identified

1. **Directory Path Issues in Production**

   - Hardcoded relative paths don't work correctly in Docker production environment
   - The static assets path calculation in `main.ts` differs between dev and prod

2. **Missing Directory Creation**

   - Upload directories weren't being created dynamically when they don't exist

3. **Insufficient Error Handling**

   - No proper error handling in upload operations
   - Missing error context for debugging production issues

4. **Code Duplication**
   - Similar upload logic repeated across multiple controllers

## Fixes Applied

### 1. Created Common Upload Utility

- **File:** `src/common/utils/upload.utils.ts`
- **Features:**
  - Dynamic directory path calculation
  - Automatic directory creation
  - Comprehensive error handling
  - Configurable file filtering

### 2. Updated All Upload Controllers

- **Files Updated:**
  - `src/contents/contents.controller.ts`
  - `src/courses/courses.controller.ts`
  - `src/reservations/reservations.controller.ts`
  - `src/users/users.controller.ts`

## All Upload Endpoints Fixed

| Endpoint               | Method | Field Name    | Upload Directory        | Status   |
| ---------------------- | ------ | ------------- | ----------------------- | -------- |
| `/contents/upload`     | POST   | `content`     | `uploads/contents/`     | ✅ Fixed |
| `/courses/upload`      | POST   | `course`      | `uploads/courses/`      | ✅ Fixed |
| `/reservations/upload` | POST   | `reservation` | `uploads/reservations/` | ✅ Fixed |
| `/user/upload-img`     | POST   | `user`        | `uploads/users/`        | ✅ Fixed |

### Testing Commands:

```bash
# Check upload directories and permissions
node scripts/check-uploads.js

# Verify all endpoints are properly configured
node scripts/verify-uploads.js
```

## Issues Identified

1. **Directory Path Issues in Production**

   - Hardcoded relative paths (`'./uploads/contents'`) don't work correctly in Docker production environment
   - The static assets path calculation in `main.ts` differs between dev and prod, but multer storage wasn't accounting for this

2. **Missing Directory Creation**

   - Upload directories weren't being created dynamically when they don't exist
   - Different behavior between reservations (working) and contents (failing)

3. **Insufficient Error Handling**

   - No proper error handling in content creation/update methods
   - Missing error context for debugging production issues
   - No file system error handling for upload operations

4. **Database Transaction Issues**
   - ContentImage cascade operations potentially failing in production
   - Missing relation loading in update operations

## Fixes Applied

### 1. Fixed Upload Directory Handling

- **File:** `src/contents/contents.controller.ts`
- **Changes:**
  - Dynamic directory path calculation based on environment
  - Automatic directory creation if not exists
  - Proper error handling for file upload operations

### 2. Enhanced Error Handling

- **Files:**
  - `src/contents/contents.service.ts`
  - `src/contents/contents.controller.ts`
  - `src/contents/interceptors/upload-error.interceptor.ts`
- **Changes:**
  - Added comprehensive error handling with logging
  - Created custom upload error interceptor
  - Added specific error handling for different filesystem errors
  - Enhanced debugging information

### 3. Improved Database Operations

- **File:** `src/contents/contents.service.ts`
- **Changes:**
  - Added relation loading in update operations
  - Better handling of image cascade operations
  - Added validation for content type creation

### 4. Docker Configuration Updates

- **File:** `Dockerfile`
- **Changes:**
  - Enhanced directory creation for production
  - Added redundant path creation for reliability
  - Proper permissions setting

### 5. Added Diagnostic Tools

- **File:** `scripts/check-uploads.js`
- **Purpose:** Debug upload directory issues in production

## Testing & Deployment

### Before Deployment:

1. Test image uploads for all content types (logs, news, projects)
2. Verify directory permissions in production environment
3. Run diagnostic script to check upload paths

### After Deployment:

1. Monitor application logs for any upload-related errors
2. Test image upload functionality for each content type
3. Check that images are being saved to correct directories

## Key Differences Between Working (Reservations) vs Broken (Contents)

| Aspect             | Reservations                       | Contents (Before Fix)          | Contents (After Fix)         |
| ------------------ | ---------------------------------- | ------------------------------ | ---------------------------- |
| Directory Path     | Hardcoded `./uploads/reservations` | Hardcoded `./uploads/contents` | Dynamic path calculation     |
| Error Handling     | Basic                              | None                           | Comprehensive                |
| Directory Creation | Manual                             | Manual                         | Automatic                    |
| Database Relations | Simple array                       | Complex cascade                | Enhanced with proper loading |

## Monitoring Points

1. **Log Messages:** Watch for "Creating {type} content" and "Successfully created" messages
2. **Error Patterns:** Monitor for filesystem errors (ENOENT, EACCES, etc.)
3. **Upload Directory:** Ensure `/app/uploads/contents` exists and is writable in production
4. **Image Paths:** Verify image paths are correctly stored in database

## Additional Recommendations

1. **Add Cleanup Job:** Implement a cleanup job for orphaned image files
2. **Implement Image Validation:** Add image format and size validation
3. **Add Monitoring:** Set up alerts for upload failures
4. **Backup Strategy:** Ensure uploaded images are included in backup strategy

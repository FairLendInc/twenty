# Port Attachments as Named Fields Feature

This feature adds Image and PDF as new composite field types to Twenty, allowing users to create named attachment fields on their objects instead of using the generic attachments relationship.

## Background

The current repository has commit `5dec1c09c9e2a1b8b97d4c6648ce0120d9548b12` which marks 40 files (many empty or with simple comments) indicating files that need changes for this feature. The FLCRMLMS fork contains the actual implementations. This plan details how to port all changes from the fork to the current repository.

## User Review Required

> [!IMPORTANT]
> This is a significant feature addition that introduces two new composite field types (IMAGE and PDF). The implementation follows the existing pattern used by other composite types like LINKS, PHONES, and EMAILS.

> [!WARNING]
> **Files missing from FLCRMLMS fork (404 errors):**
>
> Frontend files:
> - `usePersisFieldFromFieldFromFieldInputContext.ts` (typo in name?)
> - `usePersistFIeld.ts` (typo in name?)
> - `FormImageFieldInput.tsx`
> - `FormPdfFieldInput.tsx`
> - `PdfFieldInput.tsx` (in display/components directory)
> - `prefillRecord.ts`
>
> Backend validators:
> - `image-mime-validator.ts`
> - `pdf-mime-validator.ts`
> - `attachment-limit-validator.ts`
> - `composite-field-validator.ts` (separate from .service.ts)
>
> These files are marked as empty in commit `5dec1c09c9`. Two approaches:
> 1. **If files exist with different names in fork:** Search fork for similar functionality
> 2. **If truly new files:** Implement them following existing patterns from other composite field types
>
> The marker commit may have placeholder filenames with typos or incorrect paths. We'll search the fork for actual implementations during execution.

## Proposed Changes

### Shared Package (twenty-shared)

#### [NEW] [image.composite-type.ts](file:///Users/connor/Dev/twenty/packages/twenty-shared/src/types/composite-types/image.composite-type.ts)

Create new composite type definition for Image fields following the pattern of existing composite types. Defines properties like URL, alt text, metadata, etc.

#### [NEW] [pdf.composite-type.ts](file:///Users/connor/Dev/twenty/packages/twenty-shared/src/types/composite-types/pdf.composite-type.ts)

Create new composite type definition for PDF fields with properties for URL, filename, size, etc.

#### [MODIFY] [composite-type-definitions.ts](file:///Users/connor/Dev/twenty/packages/twenty-shared/src/types/composite-types/composite-type-definitions.ts)

Add IMAGE and PDF entries to the `compositeTypeDefinitions` map, and import the new composite types.

---

### Backend Validators (twenty-server)

#### [NEW] [image-mime-validator.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/field-metadata/validators/image-mime-validator.ts)

Validator for Image field MIME types, ensuring only valid image formats are accepted.

#### [NEW] [pdf-mime-validator.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/field-metadata/validators/pdf-mime-validator.ts)

Validator for PDF field MIME types.

#### [NEW] [attachment-limit-validator.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/field-metadata/validators/attachment-limit-validator.ts)

Validator to enforce limits on attachment field usage (if applicable).

#### [MODIFY] [composite-field-validator.service.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/field-metadata/validators/composite-field-validator.service.ts)

Add validation logic for IMAGE and PDF composite types.

---

### Backend Core Modules (twenty-server)

#### [MODIFY] [config-variables.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/core-modules/twenty-config/config-variables.ts)

Add configuration variable for attachments-as-named-fields feature flag.

#### [MODIFY] [composite-types/index.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/field-metadata/composite-types/index.ts)

Export the new IMAGE and PDF composite type definitions for use in the backend.

#### [MODIFY] [field-metadata-entity-test.type.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/field-metadata/types/field-metadata-entity-test.type.ts)

Update test type definitions to include IMAGE and PDF field metadata.

#### [MODIFY] [flat-field-metadata.module.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/flat-field-metadata/flat-field-metadata.module.ts)

Register composite field handlers for IMAGE and PDF types.

#### [MODIFY] [workspace-sync-metadata-commands.module.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/workspace-manager/workspace-sync-metadata/commands/workspace-sync-metadata-commands.module.ts)

Register the fix-composite-field-columns command.

#### [NEW] [fix-composite-field-columns.command.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/workspace-manager/workspace-sync-metadata/commands/fix-composite-field-columns.command.ts)

Command to fix/migrate existing composite field columns for the new types.

#### [MODIFY] [map-field-metadata-to-graphql-query.utils.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/api/rest/core/query-bulder/utils/map-field-metadata-to-graphql-query.utils.ts)

Update GraphQL query mapping to handle IMAGE and PDF field queries.

#### [MODIFY] [agent-tool-schema.utils.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/src/engine/metadata-modules/agent/utils/agent-tool-schema.utils.ts)

Update agent tool schemas to understand IMAGE and PDF fields.

---

### Backend Tests (twenty-server)

#### [NEW] [field-metadata-image-schema.integration.test.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/test/integration/field-metadata-image-schema.integration.test.ts)

Integration tests for creating, updating, and querying Image fields via GraphQL.

#### [NEW] [field-metadata-pdf-schema.integration.test.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/test/integration/field-metadata-pdf-schema.integration.test.ts)

Integration tests for creating, updating, and querying PDF fields via GraphQL.

#### [MODIFY] [successful-create-input-by-field-metadata-type.constant.ts](file:///Users/connor/Dev/twenty/packages/twenty-server/test/integration/graphql/suites/inputs-validation/create-validation/constants/successful-create-input-by-field-metadata-type.constant.ts)

Add successful test input examples for IMAGE and PDF field types.

---

### Frontend Components (twenty-front)

#### [NEW] [ImageFieldInput.tsx](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/meta-types/input/components/ImageFieldInput.tsx)

Input component for editing Image fields with upload, preview, and URL input capabilities.

#### [NEW] [PdfFieldInput.tsx](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/meta-types/input/components/PdfFieldInput.tsx)

Input component for editing PDF fields with upload and preview capabilities.

#### [NEW] [ImageFieldDisplay.tsx](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/meta-types/display/components/ImageFieldDisplay.tsx)

Display component for rendering Image fields in read-only mode.

---

### Frontend Type Guards (twenty-front)

#### [NEW] [isFieldImage.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/types/guards/isFieldImage.ts)

Type guard to check if a field is of IMAGE type.

#### [NEW] [isFieldImageValue.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/types/guards/isFieldImageValue.ts)

Type guard to check if a value is a valid ImageMetadata value.

#### [NEW] [isFieldPdf.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/types/guards/isFieldPdf.ts)

Type guard to check if a field is of PDF type.

#### [NEW] [isFieldPdfValue.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/types/guards/isFieldPdfValue.ts)

Type guard to check if a value is a valid PdfMetadata value.

---

### Frontend Updates (twenty-front)

#### [MODIFY] [FieldMetadata.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/types/FieldMetadata.ts)

Add IMAGE and PDF to the FieldMetadata type union.

#### [MODIFY] [FieldContextProvider.tsx](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/components/FieldContextProvider.tsx)

Add context providers for IMAGE and PDF fields.

#### [MODIFY] [FieldInputContainer.tsx](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/ui/field/input/components/FieldInputContainer.tsx)

Add rendering logic for IMAGE and PDF input components.

#### [MODIFY] [FormMultiSelectFieldInput.tsx](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/record-field/ui/form-types/components/FormMultiSelectFieldInput.tsx)

Updates to form handling for multi-select with IMAGE/PDF support if needed.

#### [MODIFY] [shouldDisplayFormField.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/workflow/workflow-steps/workflow-actions/utils/shouldDisplayFormField.ts)

Add logic to determine if IMAGE/PDF fields should be displayed in workflow forms.

#### [MODIFY] [useCreateOneRecord.ts](file:///Users/connor/Dev/twenty/packages/twenty-front/src/modules/object-record/hooks/useCreateOneRecord.ts)

Update record creation hook to handle IMAGE and PDF field data.

#### [MODIFY] Attachment-related files

Update files like `AttachmentGrid.tsx`, `AttachmentPreviewModal.tsx`, `AttachmentSelector.tsx`, `imageExtensions.ts`, `useUploadAttachmentFile.tsx` to work seamlessly with IMAGE and PDF fields.

---

### Scripts

#### [NEW] [pdf-image-audit.sh](file:///Users/connor/Dev/twenty/scripts/pdf-image-audit.sh)

Audit script to check for inconsistencies or issues with PDF and Image fields in the database.

## Verification Plan

### Automated Tests

1. **Run Image Field Integration Tests**
   ```bash
   cd /Users/connor/Dev/twenty/packages/twenty-server
   yarn test field-metadata-image-schema.integration.test.ts
   ```
   These tests verify that Image fields can be created via GraphQL, validate MIME types, and query/mutate correctly.

2. **Run PDF Field Integration Tests**
   ```bash
   cd /Users/connor/Dev/twenty/packages/twenty-server
   yarn test field-metadata-pdf-schema.integration.test.ts
   ```
   These tests verify that PDF fields can be created via GraphQL, validate PDF MIME types, and query/mutate correctly.

3. **Run All Field Metadata Tests**
   ```bash
   cd /Users/connor/Dev/twenty/packages/twenty-server
   yarn test:integration
   ```
   Verify that no existing field metadata tests are broken by the changes.

4. **Type Checking**
   ```bash
   cd /Users/connor/Dev/twenty
   yarn nx run-many -t typecheck
   ```
   Ensure all TypeScript code compiles without errors.

5. **Linting**
   ```bash
   cd /Users/connor/Dev/twenty
   yarn nx run-many -t lint
   ```
   Ensure code follows the project's style guidelines.

### Manual Verification

1. **Field Creation in UI**
   - Start the development server: `yarn start`
   - Navigate to Settings → Data Model → Select an object → Add Field
   - Verify that IMAGE and PDF appear as field type options
   - Create an IMAGE field and verify it appears in the object schema
   - Create a PDF field and verify it appears in the object schema

2. **Field Input/Output**
   - Create a record with an IMAGE field
   - Upload an image and verify it displays correctly
   - Edit the image URL and verify the preview updates
   - Create a record with a PDF field
   - Upload a PDF and verify it can be downloaded/previewed
   - Edit the PDF and verify changes persist

3. **GraphQL Queries**
   - Using the GraphQL playground, create an IMAGE field
   - Query objects with IMAGE fields and verify the data structure
   - Mutate IMAGE field values and verify persistence
   - Repeat for PDF fields

### Additional Testing Notes

- The feature may be behind a feature flag (`IS_ATTACHMENTS_AS_FIELDS_ENABLED` or similar in `config-variables.ts`). Ensure the flag is enabled during testing.
- Test with various image formats (JPEG, PNG, GIF, WebP) to verify mime-type validation.
- Test with non-image files to verify validation rejects them.
- Test with large files upload to verify any size limits.
- Test the audit script: `bash /Users/connor/Dev/twenty/scripts/pdf-image-audit.sh`

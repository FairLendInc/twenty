# Port Attachments as Named Fields Feature

## Planning
- [x] Examine commit `5dec1c09c9` to identify all changed files
- [x] Fetch corresponding files from FLCRMLMS fork
- [x] Create implementation plan for porting changes

## Implementation

### Shared Package (twenty-shared)
- [x] Port `image.composite-type.ts` (new composite type definition)
- [x] Port `pdf.composite-type.ts` (new composite type definition)
- [x] Update `composite-type-definitions.ts` (add Image/PDF types to map)

### Backend (twenty-server)
- [x] Port `image-mime-validator.service.ts` (new validator)
- [x] Port `pdf-mime-validator.service.ts` (new validator)
- [x] Port `attachment-limit-validator.service.ts` (new validator)
- [x] Update `composite-field-validator.service.ts` (add Image/PDF validation)
- [x] Update `composite-types/index.ts` (export new types) - Marked as complete, as the file was empty and was determined not to be necessary to update after further investigation.
- [x] Update `field-metadata-entity-test.type.ts` (test type updates)
- [x] Update `config-variables.ts` (feature flag configuration)
- [x] Update `flat-field-metadata.module.ts` (module updates)
- [x] Update `workspace-sync-metadata-commands.module.ts` (command updates)
- [x] Port `fix-composite-field-columns.command.ts` (new command)
- [x] Update `map-field-metadata-to-graphql-query.utils.ts` (GraphQL query mapping)
- [x] Update `agent-tool-schema.utils.ts` (agent tool schema updates) - Marked as complete, as the file was empty and was determined not to be necessary to update after further investigation.
- [x] Port integration tests for Image field
- [x] Port integration tests for PDF field
- [x] Update `successful-create-input-by-field-metadata-type.constant.ts` (test constants)

### Frontend (twenty-front)
- [x] Port `ImageFieldInput.tsx` (new input component)
- [x] Port `PdfFieldInput.tsx` (new input component)
- [x] Port `ImageFieldDisplay.tsx` (new display component)
- [x] Port `isFieldImage.ts` (new type guard)
- [x] Port `isFieldImageValue.ts` (new type guard)
- [x] Port `isFieldPdf.ts` (new type guard)
- [x] Port `isFieldPdfValue.ts` (new type guard)
- [x] Update `FieldMetadata.ts` (type definitions)
- [x] Update `FieldContextProvider.tsx` (context provider updates)
- [x] Update `FieldInputContainer.tsx` (container component updates)
- [x] Update `FormMultiSelectFieldInput.tsx` (form input updates) - No changes needed after investigation.
- [x] Update `shouldDisplayFormField.ts` (workflow form field logic)
- [x] Update `useCreateOneRecord.ts` (record creation hook) - No changes needed after investigation.
- [ ] Update attachment-related files (Grid, Preview, Selector, etc.)

### Scripts
- [x] Port `pdf-image-audit.sh` (audit script)

## Verification
- [ ] Run integration tests for Image fields
- [ ] Run integration tests for PDF fields
- [ ] Test field creation in UI
- [ ] Verify GraphQL queries work correctly
- [ ] Document changes in walkthrough

export const decisionTrees = {
    DIY: {
        start: {
          question: "Were the W2's of the affected EE/s E-Filed in Sentinel/CS?",
          options: [
            { text: "Yes", next: "w2Efiled" },
            { text: "No", next: "w2NotEfiled" },
          ],
        },
        w2Efiled: {
          question: "Does the case qualify for BOT Testing?",
          options: [
            { text: "Yes", next: "submitBot" },
            { text: "No", next: "createManually" },
          ],
        },
        submitBot: {
          question: "Was the BOT Test successful?",
          options: [
            { text: "Yes", next: "reviewForms" },
            { text: "No", next: "reviewError" },
          ],
        },
        reviewForms: {
          result: `
            Review the forms uploaded by BOT and close the case.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2)
            - ER Copies (W-3C with Reference Copy watermark and Copy D)
            - Agency Copy (Copy 1)
            
            **Amendment Needed in PTO:** Yes (Customer Responsible)
          `,
        },
        reviewError: {
          result: `
            Review the error, update the excel spreadsheet, and resubmit to BOT. If all attempts fail, create W-2Cs manually.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2)
            - ER Copies (W-3C with Reference Copy watermark and Copy D)
            - Agency Copy (Copy 1)
            
            **Amendment Needed in PTO:** Yes (Customer Responsible)
          `,
        },
        createManually: {
          result: `
            Create the W-2Cs manually in Sentinel.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2)
            - ER Copies (W-3C with Reference Copy watermark and Copy D)
            - Agency Copy (Copy 1)
            
            **Amendment Needed in PTO:** Yes (Customer Responsible)
          `,
        },
        w2NotEfiled: {
          question: "Were the W2's E-Filed in CS but not yet loaded in Sentinel?",
          options: [
            { text: "Yes", next: "reachOutForAssistance" },
            { text: "No", next: "w2Rejected" },
          ],
        },
        reachOutForAssistance: {
          result: "Reach out in the DIY-DIFY channel for further assistance. Our internal team will load the W-2s in Sentinel.",
        },
        w2Rejected: {
          question: "Were the W2's rejected?",
          options: [
            { text: "Yes", next: "checkDuplicateFiling" },
            { text: "No", next: "erResponsible" },
          ],
        },
        checkDuplicateFiling: {
          question: "Does the account have a duplicate filing within Intuit (Online/Desktop)?",
          options: [
            { text: "Yes", next: "prepareW2cs" },
            { text: "No", next: "erResponsible" },
          ],
        },
        prepareW2cs: {
          result: `
            Prepare W2cs in Sentinel.
            
            **Copies to upload to PTO Case as Client returns:**
            - W2c EE Copies (B, C, and 2)
            - W2 EE Copies (B, C, and 2)
            - ER Copies (W-3C with Reference Copy watermark and Copy D)
            - Agency Copy (Copy 1)
            
            **Amendment Needed in PTO:** Select "YES" for Amendments. Amendments team will key W2s and W3.
          `,
        },
        erResponsible: {
          result: "ER will be responsible for their W2/W-2C.",
        },
      },
      DIFY: {
        start: {
          question: "Were the W2's of the affected EE/s E-Filed in Sentinel/CS?",
          options: [
            { text: "Yes", next: "w2Efiled" },
            { text: "No", next: "w2NotEfiled" },
          ],
        },
        w2Efiled: {
          question: "Does the case qualify for BOT Testing?",
          options: [
            { text: "Yes", next: "submitBot" },
            { text: "No", next: "createManually" },
          ],
        },
        submitBot: {
          question: "Was the BOT Test successful?",
          options: [
            { text: "Yes", next: "reviewForms" },
            { text: "No", next: "reviewError" },
          ],
        },
        reviewForms: {
          result: `
            Review the forms uploaded by BOT and close the case.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2) Only
            
            **Amendment Needed in PTO:**
            Did we E-file any of the quarterly and annual forms, including the W2?
            - If Yes, answer Yes.
            - If No, answer Yes (Customer Responsible).
          `,
        },
        reviewError: {
          result: `
            Review the error, update the excel spreadsheet, and resubmit to BOT. If all attempts fail, create W-2Cs manually.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2) Only
            
            **Amendment Needed in PTO:**
            Did we E-file any of the quarterly and annual forms, including the W2?
            - If Yes, answer Yes.
            - If No, answer Yes (Customer Responsible).
          `,
        },
        createManually: {
          result: `
            Create the W-2Cs manually in Sentinel.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2) Only
            
            **Amendment Needed in PTO:**
            Did we E-file any of the quarterly and annual forms, including the W2?
            - If Yes, answer Yes.
            - If No, answer Yes (Customer Responsible).
          `,
        },
        w2NotEfiled: {
          question: "Were the W2's E-Filed in CS but not yet loaded in Sentinel?",
          options: [
            { text: "Yes", next: "reachOutForAssistance" },
            { text: "No", next: "w2Rejected" },
          ],
        },
        reachOutForAssistance: {
          result: `
            Reach out in the DIY-DIFY channel for further assistance. Our internal team will load the W-2s in Sentinel.
            
            **Copies to upload to PTO Case as Client returns:**
            - EE Copies (B, C, and 2) Only
            
            **Amendment Needed in PTO:**
            Did we E-file any of the quarterly and annual forms, including the W2?
            - If Yes, answer Yes.
            - If No, answer Yes (Customer Responsible).
          `,
        },
        w2Rejected: {
          question: "Were the W2's rejected?",
          options: [
            { text: "Yes", next: "checkDuplicateFiling" },
            { text: "No", next: "erResponsible" },
          ],
        },
        checkDuplicateFiling: {
          question: "Does the account have a duplicate filing within Intuit (Online/Desktop)?",
          options: [
            { text: "Yes", next: "prepareW2cs" },
            { text: "No", next: "erResponsible" },
          ],
        },
        prepareW2cs: {
          result: `
            Prepare W2cs in Sentinel for employees who are in Sentinel and need a W2c.
            Pull a W2 from QBOP expert for employees who didn't receive an original W2.
            
            **Copies to upload to PTO Case as Client returns:**
            - W2c EE Copies (B, C, and 2)
            - W2 EE Copies (B, C, and 2)
            - ER Copies (W-3C with Reference Copy watermark and Copy D)
            - Agency Copy (Copy 1)
            
            **Amendment Needed in PTO:**
            Select "YES" for Amendments. Amendments team will key W2s and W3.
          `,
        },
        erResponsible: {
          result: `
            ER will be responsible for their W2/W-2C.
            
            **Amendment Needed in PTO:**
            Yes (Customer Responsible).
          `,
        },
      },
    
}       
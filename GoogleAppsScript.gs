/*
 * GOOGLE APPS SCRIPT - Jopips Signal Registration Backend
 * 
 * This script receives form submissions from your website and saves them to Google Sheets.
 * It also prevents duplicate registrations based on phone numbers.
 * 
 * SETUP INSTRUCTIONS:
 * See SETUP_GUIDE.md for complete step-by-step instructions
 */

// Configuration
const SHEET_NAME = 'Registrations'; // Name of the sheet where data will be saved
const DUPLICATE_CHECK_COLUMN = 2; // Column B (WhatsApp Number) for duplicate checking

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Add headers
      const headers = [
        'Timestamp',
        'WhatsApp Number',
        'Full Name',
        'Market Preference',
        'Experience Level',
        'Broker',
        'Registration Date'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#dc143c')
        .setFontColor('#ffffff');
      
      // Freeze header row
      sheet.setFrozenRows(1);
    }
    
    // Check for duplicate phone number
    const phoneNumber = data.whatsappNumber;
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][DUPLICATE_CHECK_COLUMN - 1] === phoneNumber) {
        // Duplicate found
        return ContentService.createTextOutput(JSON.stringify({
          'result': 'error',
          'message': 'This phone number is already registered'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Prepare row data
    const rowData = [
      new Date().toISOString(),
      data.whatsappNumber,
      data.fullName,
      data.marketPreference,
      data.experience,
      data.broker,
      new Date().toLocaleDateString()
    ];
    
    // Append the new row
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Registration successful'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - you can run this to test the script)
function testDoPost() {
  const testData = {
    fullName: 'Test User',
    whatsappNumber: '+1234567890',
    marketPreference: 'both',
    experience: 'beginner',
    broker: 'MetaTrader',
    timestamp: new Date().toISOString()
  };
  
  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(testEvent);
  Logger.log(result.getContent());
}

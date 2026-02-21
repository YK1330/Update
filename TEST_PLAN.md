# Comprehensive Testing Plan - College Application Management System

## System Overview
- **Backend**: Express.js + Prisma + SQLite (Port 4000)
- **Frontend**: React + Vite (Port 8081)
- **Demo Credentials**:
  - Admin: admin@college.edu / admin123
  - Counselor 1: priya@college.edu / counselor123
  - Counselor 2: rahul@college.edu / counselor123
  - Student 1: ankit@student.com / student123
  - Student 2: neha@student.com / student123

## CRUD Operations to Test

### 1. STUDENT LOGIN & ENQUIRY FORM (CREATE)
**Test Case 1.1: Student Login**
- [ ] Go to http://localhost:8081/student/login
- [ ] Enter: ankit@student.com / student123
- [ ] Verify: Redirects to /student/dashboard
- [ ] Verify: Student name "Ankit Singh" displays

**Test Case 1.2: Submit New Enquiry**
- [ ] Go to http://localhost:8081/enquiry
- [ ] Fill form:
  - Name: "John Doe"
  - Email: "john@test.com"
  - Phone: "9999999999"
  - Course: "B.Tech Computer Science"
  - Message: "Interested in AI/ML specialization"
- [ ] Click "Submit Enquiry"
- [ ] Verify: Success message appears
- [ ] Verify: New enquiry appears in database

**Test Case 1.3: Student Dashboard - Track Enquires**
- [ ] Student logs in
- [ ] Go to /student/dashboard
- [ ] Click "My Enquiries" tab
- [ ] Verify: Student's submitted enquiries display with status

**Test Case 1.4: Student Notifications**
- [ ] In Student Dashboard, click "Notifications" tab
- [ ] Click on unread notification
- [ ] Verify: Notification status changes to "read"
- [ ] Verify: Visual indicator (background color) changes

### 2. ADMIN LOGIN & DASHBOARD (READ)
**Test Case 2.1: Admin Login**
- [ ] Go to http://localhost:8081/admin/login
- [ ] Enter: admin@college.edu / admin123
- [ ] Verify: Redirects to /admin/dashboard
- [ ] Verify: Dashboard displays with stats cards

**Test Case 2.2: Dashboard Stats**
- [ ] Admin Dashboard shows:
  - [ ] Total Enquiries count
  - [ ] New enquiries count
  - [ ] Contacted count
  - [ ] Follow-ups count
  - [ ] Converted count
  - [ ] Rejected count
- [ ] Verify: Charts load (Monthly Enquiries, Course Distribution)
- [ ] Verify: Recent enquiries table displays
- [ ] Verify: Recent enquiries show correct status badges

### 3. ENQUIRY MANAGEMENT (READ/UPDATE)
**Test Case 3.1: View All Enquiries**
- [ ] Admin goes to /admin/enquiries
- [ ] Verify: All enquiries are listed in table
- [ ] Verify: Search by name works
- [ ] Verify: Search by email works
- [ ] Verify: Filter by status works (New, Contacted, Follow-up, Converted, Rejected)

**Test Case 3.2: Update Enquiry Status**
- [ ] Click on enquiry status dropdown (e.g., "new")
- [ ] Change to "contacted"
- [ ] Verify: Status updates immediately
- [ ] Verify: Database persists the change

**Test Case 3.3: Assign Counselor**
- [ ] Click on "Assign..." dropdown for an enquiry
- [ ] Select a counselor (e.g., "Priya Sharma")
- [ ] Verify: Counselor assignment updates immediately
- [ ] Verify: Assignment persists in database

**Test Case 3.4: Add Notes to Enquiry**
- [ ] Click notes icon for an enquiry
- [ ] Notes dialog opens
- [ ] Type note: "Customer interested but budget constraints"
- [ ] Click "Add"
- [ ] Verify: Note appears in the dialog
- [ ] Verify: Note persists when reopening dialog
- [ ] Verify: Note has correct author and date

**Test Case 3.5: Pagination**
- [ ] Ensure there are 6+ enquiries
- [ ] Verify: "Pagination" shows at bottom if needed
- [ ] Click "Next" button
- [ ] Verify: Next page of enquiries displays
- [ ] Click "Prev" button
- [ ] Verify: Previous page displays

### 4. COUNSELOR MANAGEMENT (CREATE/READ/UPDATE/DELETE)
**Test Case 4.1: View Counselors**
- [ ] Admin goes to /admin/counselors
- [ ] Verify: All counselors display as cards
- [ ] Verify: Each card shows name, email, phone
- [ ] Verify: Each card shows "Assigned Leads" count

**Test Case 4.2: Add New Counselor**
- [ ] Click "Add Counselor" button
- [ ] Fill form:
  - Name: "Deepak Sharma"
  - Email: "deepak@college.edu"
  - Phone: "9876543220"
  - Password: "test1234"
- [ ] Click "Add Counselor"
- [ ] Verify: New counselor appears in the list

**Test Case 4.3: Edit Counselor**
- [ ] Click edit (pencil) icon on a counselor
- [ ] Change name to "Deepak Kumar"
- [ ] Change phone
- [ ] Click "Update Counselor"
- [ ] Verify: Changes persist
- [ ] Reopen dialog
- [ ] Verify: Updated name shows

**Test Case 4.4: Delete Counselor**
- [ ] Click delete (trash) icon on a counselor
- [ ] Verify: Confirmation toast appears
- [ ] Verify: Counselor is removed from list
- [ ] Verify: Any enquiries assigned to this counselor show as "Unassigned"

### 5. COURSE MANAGEMENT (READ)
**Test Case 5.1: View Courses**
- [ ] Go to /courses
- [ ] Verify: All courses display as cards
- [ ] Verify: Each card shows: name, department, duration, fees, seats

**Test Case 5.2: Filter by Department**
- [ ] Click "Engineering" filter
- [ ] Verify: Only engineering courses display
- [ ] Click "Management" filter
- [ ] Verify: Only management courses display
- [ ] Click "All" filter
- [ ] Verify: All courses display

**Test Case 5.3: Course Detail Page**
- [ ] Click "Details" button on a course
- [ ] Verify: Full course details display (description, syllabus)
- [ ] Verify: Sidebar shows duration, fees, seats
- [ ] Click "Enquire Now"
- [ ] Verify: Redirects to enquiry form with course pre-selected

### 6. REPORTS & ANALYTICS (READ)
**Test Case 6.1: View Reports**
- [ ] Admin goes to /admin/reports
- [ ] Verify: KPI cards display (Total, Conversions, Rate, Pending)

**Test Case 6.2: Export CSV**
- [ ] Click "Export CSV" button
- [ ] Verify: Enquiries CSV file downloads
- [ ] Open CSV and verify data format

### 7. TRACK APPLICATION (READ)
**Test Case 7.1: Track Submitted Enquiry**
- [ ] Go to /track
- [ ] Enter email of student with enquiry
- [ ] Click "Search"
- [ ] Verify: Enquiry displays with timeline
- [ ] Verify: Timeline shows current status highlighted

**Test Case 7.2: Track with No Results**
- [ ] Go to /track
- [ ] Enter non-existent email
- [ ] Click "Search"
- [ ] Verify: "No enquiries found" message displays

## Bug Fixes Implemented

1. ✅ **Notification Filtering**: Fixed GET /api/notifications to properly filter by userId
2. ✅ **CORS Configuration**: Updated to use environment variables for production
3. ✅ **Note ID Generation**: Improved to prevent collisions using timestamp + random string
4. ✅ **Database Sync**: Fixed initDB() to properly wait for server data loading
5. ✅ **Student Notifications**: Fixed refresh behavior after marking as read
6. ✅ **Enquiry Notes Update**: Improved handling of note creation and updates

## Test Results Summary
- **Total Test Cases**: 28
- **Passes**: ___/28
- **Failures**: ___/28
- **Critical Issues**: ___

## Notes
- All timestamps should display in local date format
- All form validations should show appropriate error messages
- All API responses should include proper error handling
- Database should persist data across server restarts

General

1.  Set lazy loading for admin routes (admin)
2.  admin routes for all clients uses render method?
3.  Is there timeout on token?
4.  Input cursor problem still needs addressing
5.  Tables need an orderby?
6.  Logos and flavicons
7.  In navigation, replace Profile link with users name?
8.  Build component to filter tables.
9.  Use react-select to simplify some forms.

===============================================================

Folder Structure

1.  Move actions and reducers into a store folder
2.  Move admin sections together:
    eg: Contract (new folder name) ->
    ContractList
    CreateContract
3.  Move dashboard section togather
    eg: DashboardCalendar (new folder name) ->
    BigCalendarToolbar
    Bookingcalendar
    BookingModal
    Legend
4.  teamlist, clientlist, holidaylist all similar

==============================================================

Pages

Profile

1.  Should you be able to approve your own holidays, even as an admin?
2.  If so, why would you decline?

---

Dashboard

1.  Show events per month only
2.  Set up redux store for Dashboard

---

Admin

Employees

1.  Add top corner create more button to navigate to create employee.

Employee Profile

1.  Email should be a link with mailto

Employee Create

1.  Add top corner button to navigate to view employees.

Pending Holidays

1.  Expand holidays section to allow filtering of status
2.  Remove this section

Teams

1.  Fix error if no client exists
2.  Need functionality to edit teams

Contracts

1.  This whole process is a bit confusing?
2.  End date needs to be optional.
3.  Need to be able to edit a contract.

==============================================================

Back-end requests:

1.  Employees
    - Today's status (WFH, On Holiday, etc)
    - Teams
    - Num Days remaining
    - Num Days booked
2.  Clients
    - Teams
    - Employees
    - Contact Details
3.  Teams
    - Employees
    - Description
    - Contact Details
    - Team leader(s)
4.  Contracts
    - Client
    - Team

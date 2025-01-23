export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><strong>Assignment Name</strong></label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of your Web Application running on Netlify. The landing page should include the following: Your full name and section Links to each of the assignments Link to the Kanbas application Links to all relavent source code repositories The Kanbas application should include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-group"> Assignment Group: </label>
            </td>
            <select id="wd-group">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="CREATEGROUP">[Create Group]</option>
            </select>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-display-grade-as"> Display Grade as </label>
            </td>
            <select id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
            </select>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-submission-type"> Submission Type </label>
            </td>
            <select id="wd-submission-type">
                <option value="ONLINE">Online</option>
                <option value="ONPAPER">On Paper</option>
            </select> <br/>
            <label>Online Entry Options</label><br/>
            <input type="checkbox" name="check-entry" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>
            <input type="checkbox" name="check-entry" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
            <input type="checkbox" name="check-entry" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
            <input type="checkbox" name="check-entry" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotations</label><br/>
            <input type="checkbox" name="check-entry" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label><br/>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label  htmlFor="wd-assign-to"> Assign </label>
            </td>
            <td colSpan={3}>
                <label htmlFor="wd-assign-to"> Assign to </label> 
                <br/>
                <input type="text"
                placeholder="Everyone"
                id="wd-assign-to"/><br/>
                <label htmlFor="wd-due-date"> Due </label> 
                <br/>
                <input type="date"
                value="2024-05-13"
                id="wd-due-date"/><br/>
                <label htmlFor="wd-available-from"> Available From </label> 
                <label htmlFor="wd-available-until"> Until </label> 
                <br/>
                <input type="date"
                value="2024-05-06"
                id="wd-available-from"/>
                <input type="date"
                value="2024-05-20"
                id="wd-available-until"/>
            </td>
          </tr>
        </table>
        <button id="wd-cancel">Cancel</button>
        <button id="wd-save">Save</button>
      </div>
  );}
  
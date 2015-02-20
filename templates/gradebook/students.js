<script id="templates_gradebook_students" type="text/x-handlebars-template">

    <p>Points Possible: {{ data.assignment.Possible }}</p>                   
    <p>Due Date: {{ data.assignment.DueDate }}</p>
    
    {{ foreach data.students }}
    
    <tr>
        <td> {{ FirstName }} </td>
        <td><input type=number mix=0 max="{{ data.assignment.Possible }}"></td>
        <td>
            <div class=dropdown>
                <button id=status type=button data-toggle=dropdown aria-haspopup=true aria-expanded=false>
                    Status
                    <span class='caret'></span>
                </button>
    
                <ul class=dropdown-menu role=menu aria-labelledby=status>
                    <li>Missing</li>
                    <li>Late</li>
                    <li>Excused</li>
                    <li>Absent</li>
                </ul>
            </div>
    
            <span id='statuslabel'></span>
        </td>
    </tr>

</script>
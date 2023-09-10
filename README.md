# Simple Todo List

## 設計稿

[Figma](https://www.figma.com/file/pFivfS3rDX3N3u3dN9aIlx/TodoList?node-id=0%3A1)

## CSS 範例

[Codepen](https://codepen.io/liao/pen/mdpmXKg?editors=1010)

## Screenshot 

#### Sign In 
<img src="https://i.imgur.com/VHdVuAc.png" alt="sign in" width="80%" />

#### Sign Up 
<img src="https://i.imgur.com/56vbJpf.png" alt="sign up" width="80%" />

### Todo List
<img src="https://i.imgur.com/uxqlULY.png" alt="todo list" width="80%" />

## History 
<table>
    <thead>
        <tr>
            <th style="text-align: center;">Date</th>
            <th style="text-align: center;">Version</th>
            <th style="text-align: center;">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="3">2023-09-03</td>
            <td>V 0.0.1</td>
            <td>Init commit</td>
        </tr>
        <tr>
            <td>V 0.0.2</td>
            <td>Add gh-pages base path</td>
        </tr>
        <tr>
            <td>V 0.0.3</td>
            <td>Add tailwind css</td>
        </tr>
        <tr>
            <td rowspan="4">2023-09-04</td>
            <td rowspan="4">V 0.1.0</td>
            <td>New Feature：Login validation</td>
        </tr>
        <tr>
            <td>Add login form：LoginForm.jsx, login-form.css</td>
        </tr>
        <tr>
            <td>Add InvalidText.jsx form validate input<td>
        </tr>
        <tr>
            <td>Add sweetalert2</td>
        </tr>
        <tr>
            <td rowspan="7">2023-09-05</td>
            <td rowspan="4">V 0.1.3</td>
            <td>Add FormField component for application</td>
        </tr>
        <tr>
            <td>Extract LoginForm label and input into FormField</td>
        </tr>
        <tr>
            <td>Update App layout</td>
        </tr>
        <tr>
            <td>Extract button style with btn-primary and btn-secondary</td>
        </tr>
        <tr>
            <td rowspan="3">V 0.2.0</td>
            <td>New Features：Add Sign up validation</td>
        </tr>
        <tr>
            <td>Add login prop to LoginForm for reset FormField error.</td>
        </tr>
        <tr>
            <td>Update LoginForm：update handle function name, add validate alert</td>
        </tr>
        <tr>
            <td rowspan="6">2023-09-07</td>
            <td rowspan="6">V 0.2.5</td>
            <td>Add React router：set SignInForm and SignUpForm path into router</td>
        </tr>
        <tr>
            <td>Add Auth page：Extract App children into Auth page</td>
        </tr>
        <tr>
            <td>Add Content.jsx layout</td>
        </tr>
        <tr>
            <td>Rename LoginForm.jsx with SignInForm.jsx</td>
        </tr>
        <tr>
            <td>Add Todo page</td>
        </tr>
        <tr>
            <td>Update reset field error method</td>
        </tr>
        <tr>
            <td rowspan="3">2023-09-08</td>
            <td rowspan="3">V 0.3.0</td>
            <td>New Features：Add sign out, sign in and checkout for user </td>
        </tr>
        <tr>
            <td>Add TodoProvider.jsx</td>
        </tr>
        <tr>
            <td>Update Todo layout and style</td>
        </tr>
        <tr>
            <td rowspan="4">2023-09-09</td>
            <td rowspan="4">V 0.3.5</td>
            <td>Add TodoList.jsx and empty svg</td>
        </tr>
        <tr>
            <td>Update todo page style</td>
        </tr>
        <tr>
            <td>Add react-icons library</td>
        </td>
        <tr>
            <td>Fix：sign up finish, redirect to sign in page</td>
        </tr>
        <tr>
            <td rowspan="22">2023-09-10</td>
            <td rowspan="3">V 0.4.5</td>
            <td>New Feature：Add todo item into todo list</td>
        </tr>
        <tr>
            <td>Show todo list</td>
        </tr>
        <tr>
            <td>Add todo list tab and style</td>
        </tr>
        <tr>
            <td rowspan="3">V 0.5.5</td>
            <td>New Feature：Delete todo item from todo list</td>
        </tr>
        <tr>
            <td>Add todo item style</td>
        </tr>
        <tr>
            <td>Extract restful api method into api.js under utils path</td>
        </tr>
        <tr>
            <td rowspan="3">V 0.6.5</td>
            <td>New Feature：Update todo item, add put method into api.js</td>
        </tr>
        <tr>
            <td>Extract get todo list into api.js</td>
        </tr>
        <tr>
            <td>Extract Swal method into dialog.js under utils</td>
        </tr>
        <tr>
            <td rowspan="3">V 0.7.5</td>
            <td>New Feature：Update todo item status</td>
        </tr>
        <tr>
            <td>Modify check square icon to input check box</td>
        </tr>
        <tr>
            <td>Update input check box style</td>
        </tr>
        <tr>
            <td rowspan="2">V 0.8.5</td>
            <td>New Feature：Delete all finished item.</td>
        </tr>
        <tr>
            <td>Update finished item style.</td>
        </tr>
        <tr>
            <td rowspan="2">V 0.9.0</td>
            <td>Extract List component from TodoList.jsx</td>
        </tr>
        <tr>
            <td>Update todo list style</td>
        </tr>
        <tr>
            <td rowspan="4">V 0.1.0</td>
            </td>Add key press event listener into SignIn, SignUp, TodoList component</td>
        </tr>
        <tr>
            <td>Extract SignIn and SignUp axios into api.js</td>
        </tr>
        <tr>
            <td>Extract SignIn and SignUp Sweetalert method into dialog.js</td>
        </tr>
        <tr>
            <td>Fix：Finished item update forbidden</td>
        </tr>
        <tr>
            <td>V 1.0.1</td>
            <td>Add README.md screenshot section</td>
        </tr>
        <tr>
            <td>V 1.0.2</td>
            <td>Fix：force index redirect to sign-in page</td>
        </tr>
    </tbody>
</table>
const TodoForm = () => {
  return (
    <>
      <form action="">
        <fieldset>
          <legend>Information to be registered on the todo list</legend>
          <fieldset>
            <legend>Personal Data</legend>
            <input type="text" name="fname" placeholder="First Name" required />
            <input type="text" name="lname" placeholder="Last Name" required />
            <input
              type="text"
              name="email"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Gender</legend>
            <label>
              <input type="radio" id="male" name="gender" value="male" checked />
              Male
            </label>
            <label>
              <input type="radio" id="female" name="gender" value="female" />
              Female
            </label>
          </fieldset>
          <fieldset>
            <legend>Task</legend>
            <input type="text" name="task" placeholder="Task" required />
          </fieldset>
          <fieldset>
            <legend>Type of Task</legend>
            <label>
              <input type="checkbox" id="hobby" name="hobby" value="hobby" />
              Hobby
            </label>
            <label>
              <input type="checkbox" id="work" name="work" value="work" />
              Work
            </label>
            <label>
              <input type="checkbox" id="study" name="study" value="study" />
              Study
            </label>
            <label>
              <input type="checkbox" id="others" name="others" value="others"/>
              Other Categories
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
export default TodoForm;

import React from 'react'

function TaskInlineForm(props) {
  return (
    <form className="task-inline-form" onSubmit={e => props.submitTask(e)} className="mt-3" data-task={props.taskId}>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                onChange={e => props.setTaskValue(e.target.value)}
                value={props.taskValue}
                className="task-inline-form--value quiet-input input is-shadowless is-radiusless pl-0"
                type="text"
                placeholder={props.inputPlaceholderText}
              ></input>
            </div>
          </div>
          <div className="field is-narrow">
            <div className="control">
              <select className="task-inline-form--select" value={props.taskCategory} onChange={e => props.setTaskCategory(e.target.value)}>
                <option value="category" hidden>
                  Category
                </option>
                <option value="Setup">Setup</option>
                <option value="Design">Design</option>
                <option value="Content">Content</option>
                <option value="Functionality">Functionality</option>
              </select>
            </div>
          </div>
          <div className="field is-narrow">
            <div className="control">
              <select className="task-inline-form--select" value={props.taskStatus} onChange={e => props.setTaskStatus(e.target.value)}>
                <option value="status" hidden>
                  Status
                </option>
                <option value="Planning">Planning</option>
                <option value="Implementing">Implementing</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          </div>
          <div className="field is-narrow task-inline-form--button">
            <div className="control">
              <button className="button is-outlined is-primary is-small">{props.submitButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default TaskInlineForm

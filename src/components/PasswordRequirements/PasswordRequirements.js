import React from "react"
import Requirement from "./Requirements.js"
import "./PasswordRequirements.scss"

const PasswordRequirements = ({ length, characters }) => (
  <div className="password-requirements">
    <h2>Password Requirements</h2>
    <Requirement
      htmlFor="password"
      isvalid={length}
      invalidMessage="Password Must Be Longer Than 8 Characters!"
      validMessage="Password Is Longer Than 8 Characters!"
    />
    <Requirement
      htmlFor="password"
      isvalid={characters}
      invalidMessage="Password Must Contain Letters and Numbers!"
      validMessage="Password Contains Letters and Numbers!"
    />
  </div>
)

export default PasswordRequirements

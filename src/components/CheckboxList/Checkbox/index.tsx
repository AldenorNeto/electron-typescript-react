import styled from 'styled-components'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
}

const CheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  user-select: none;
  width: 20px;
  height: 20px;
`

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`

interface CustomCheckboxProps {
  checked: boolean
}

const CustomCheckbox = styled.div<CustomCheckboxProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? '#fff' : 'transparent')};
  transition: background-color 0.3s;
`

const CheckboxLabel = styled.span`
  margin-left: 30px; /* Espaçamento entre o checkbox e o texto */
`

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <CustomCheckbox checked={checked} />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  )
}

export default Checkbox

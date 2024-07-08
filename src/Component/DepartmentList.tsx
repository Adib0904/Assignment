import React, { useState } from 'react';
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse, Container, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departments = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"]
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"]
  }
];

interface Department {
  department: string;
  sub_departments: string[];
}

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen(prevOpen => ({ ...prevOpen, [department]: !prevOpen[department] }));
  };

  const handleSelectDepartment = (department: string) => {
    const isSelected = !selected[department];
    const updatedSelected = { ...selected, [department]: isSelected };

    const subDepartments = departments.find(d => d.department === department)?.sub_departments || [];
    subDepartments.forEach(sub => {
      updatedSelected[sub] = isSelected;
    });

    setSelected(updatedSelected);
  };

  const handleSelectSubDepartment = (subDepartment: string, parentDepartment: string) => {
    const isSelected = !selected[subDepartment];
    const updatedSelected = { ...selected, [subDepartment]: isSelected };

    const parentSubDepartments = departments.find(d => d.department === parentDepartment)?.sub_departments || [];
    const allSelected = parentSubDepartments.every(sub => updatedSelected[sub]);
    updatedSelected[parentDepartment] = allSelected;

    setSelected(updatedSelected);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <List>
        {departments.map((department: Department) => (
          <div key={department.department}>
            <ListItem button onClick={() => handleToggle(department.department)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!selected[department.department]}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleSelectDepartment(department.department)}
                />
              </ListItemIcon>
              <ListItemText primary={department.department} />
              <IconButton>
                {open[department.department] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={open[department.department]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.sub_departments.map(subDepartment => (
                  <ListItem key={subDepartment} style={{ paddingLeft: '2em' }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={!!selected[subDepartment]}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleSelectSubDepartment(subDepartment, department.department)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDepartment} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Container>
  );
};

export default DepartmentList;

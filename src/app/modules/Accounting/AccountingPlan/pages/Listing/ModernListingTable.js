import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
}

export default function ModernListingTable({ accountingData }) {
  const [openGroups, setOpenGroups] = React.useState({});

  // Agrupar por grupo y luego por cuenta
  const grouped = groupBy(accountingData, "group");

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <Card
      style={{
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: 32,
      }}
    >
      <CardBody style={{ padding: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                style={{
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <TableCell style={{ color: "white", fontWeight: 700 }}>
                  Grupo
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: 700 }}>
                  Cuenta
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: 700 }}>
                  Subcuenta
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: 700 }}>
                  Cuenta Auxiliar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(grouped).map(([group, items]) => {
                const byAccount = groupBy(items, "account");
                return (
                  <React.Fragment key={group}>
                    <TableRow style={{ background: "#f4f6fa" }}>
                      <TableCell
                        colSpan={4}
                        style={{ fontWeight: 700, fontSize: 16 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => toggleGroup(group)}
                        >
                          {openGroups[group] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        {group.trim()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ padding: 0, border: "none" }}
                        colSpan={4}
                      >
                        <Collapse
                          in={openGroups[group]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Table size="small">
                            <TableBody>
                              {Object.entries(byAccount).map(
                                ([account, accItems]) => (
                                  <React.Fragment key={account}>
                                    <TableRow style={{ background: "#e9ecef" }}>
                                      <TableCell style={{ fontWeight: 600 }}>
                                        {account.trim()}
                                      </TableCell>
                                      <TableCell colSpan={3}></TableCell>
                                    </TableRow>
                                    {accItems.map((item, idx) => (
                                      <TableRow key={item.id}>
                                        <TableCell></TableCell>
                                        <TableCell style={{ fontWeight: 500 }}>
                                          {item.subAccount.trim()}
                                        </TableCell>
                                        <TableCell>
                                          {item.auxiliary.trim()}
                                        </TableCell>
                                        <TableCell></TableCell>
                                      </TableRow>
                                    ))}
                                  </React.Fragment>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

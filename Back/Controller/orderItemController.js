const db = require("../DB/db")
const OrderItemStatus = require("../Enums/OrderItemStatus")
const OrderStatus = require("../Enums/OrderStatus")

const getOrderItemUser = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ?", [id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        return res.status(200).json({ status: true, message: "Item  Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllOrderItemsUser = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }
        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE user_id = ? ", [user_id])

        return res.status(200).json({ status: true, message: "All Items Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllOrderItemsUserForOrderId = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "USER Not Found" })
        }

        const [rowIsOrderExist] = await db.promise().execute("SELECT * FROM `order` WHERE id = ?", [id])
        if (rowIsOrderExist.length === 0) {
            return res.status(400).json({ status: false, message: "Order not found" })
        }

        const [row] = await db.promise().execute("SELECT ot.id AS order_item_id, ot.status AS status, ot.price AS price, ot.created_at AS date, d.id AS dress_id, d.name AS dress_name, d.image AS dress_image FROM order_item ot JOIN dress d ON ot.dress_id = d.id WHERE ot.order_id = ?", [id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Order items not found" })
        }

        return res.status(200).json({ status: true, message: "Item  Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getOrderItemEmployee = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Employee Not Found" })
        }

        const [row] = await db.promise().execute("SELECT ot.shoulder, ot.chest, ot.bust, ot.under_bust, ot.waist, ot.hip, ot.thigh, ot.total_rise, ot.calf, ot.upper_arm, ot.inseam, ot.outseam, ot.height, d.id AS dress_id, d.name AS dress_name, d.image AS dress_image, d.price AS dress_price, d.description AS dress_description FROM order_item ot JOIN dress d ON ot.dress_id = d.id WHERE ot.id = ? AND ot.employee_id = ?", [id, user_id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        return res.status(200).json({ status: true, message: "Item  Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllOrderItemsEmployee = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Employee Not Found" })
        }

        const [row] = await db.promise().execute("SELECT ot.id AS order_item_id, ot.status AS status, ot.created_at AS date, d.id AS dress_id, d.name AS dress_name, d.image AS dress_image FROM order_item ot JOIN dress d ON ot.dress_id = d.id WHERE ot.employee_id = ? ", [user_id])

        return res.status(200).json({ status: true, message: "All Items Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getOrderItemAdmin = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "ADMIN Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ?", [id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        return res.status(200).json({ status: true, message: "Item  Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllOrderItemsAdminForOrderId = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "ADMIN Not Found" })
        }

        const [rowIsOrderExist] = await db.promise().execute("SELECT * FROM `order` WHERE id = ?", [id])
        if (rowIsOrderExist.length === 0) {
            return res.status(400).json({ status: false, message: "Order not found" })
        }

        const [row] = await db.promise().execute("SELECT ot.id AS order_item_id, ot.status AS status, ot.price AS price, ot.created_at AS date, d.id AS dress_id, d.name AS dress_name, d.image AS dress_image FROM order_item ot JOIN dress d ON ot.dress_id = d.id WHERE ot.order_id = ?", [id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Order items not found" })
        }

        return res.status(200).json({ status: true, message: "Item  Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllOrderItemsAdmin = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "ADMIN Not Found" })
        }

        const [row] = await db.promise().execute("SELECT ot.id AS order_item_id, ot.status AS status, ot.employee_id AS employee_id, ot.created_at AS date, d.id AS dress_id, d.name AS dress_name, d.image AS dress_image FROM order_item ot JOIN dress d ON ot.dress_id = d.id")

        return res.status(200).json({ status: true, message: "All Items Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateOrderItemUser = async (req, res) => {
    const { id } = req.params
    let { shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height } = req.body
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ? AND user_id = ? ", [id, user_id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        if (row[0].status === OrderItemStatus.NOT_ACCEPTED || row[0].status === OrderItemStatus.NOT_PAID) {
            const [rowDressType] = await db.promise().execute("SELECT dt.* FROM dress_type dt JOIN dress d ON dt.id = d.type_id WHERE d.id = ?", [row[0].dress_id])
            if (rowDressType.length === 0) {
                return res.status(400).json({ status: false, message: "Dress type not found" })
            } else {
                if (rowDressType[0].shoulder) {
                    if (shoulder === null) {
                        return res.status(400).json({ status: false, message: "Shoulder measure required" })
                    }
                } else {
                    shoulder = null
                }

                if (rowDressType[0].chest) {
                    if (chest === null) {
                        return res.status(400).json({ status: false, message: "Chest measure required" })
                    }
                } else {
                    chest = null
                }

                if (rowDressType[0].under_bust) {
                    if (under_bust === null) {
                        return res.status(400).json({ status: false, message: "Under Bust measure required" })
                    }
                } else {
                    under_bust = null
                }

                if (rowDressType[0].waist) {
                    if (waist === null) {
                        return res.status(400).json({ status: false, message: "Waist measure required" })
                    }
                } else {
                    waist = null
                }

                if (rowDressType[0].hip) {
                    if (hip === null) {
                        return res.status(400).json({ status: false, message: "Hip measure required" })
                    }
                } else {
                    hip = null
                }

                if (rowDressType[0].thigh) {
                    if (thigh === null) {
                        return res.status(400).json({ status: false, message: "Thigh measure required" })
                    }
                } else {
                    thigh = null
                }

                if (rowDressType[0].total_rise) {
                    if (total_rise === null) {
                        return res.status(400).json({ status: false, message: "Total Rise measure required" })
                    }
                } else {
                    total_rise = null
                }

                if (rowDressType[0].calf) {
                    if (calf === null) {
                        return res.status(400).json({ status: false, message: "Calf measure required" })
                    }
                } else {
                    calf = null
                }

                if (rowDressType[0].upper_arm) {
                    if (upper_arm === null) {
                        return res.status(400).json({ status: false, message: "Upper Arm measure required" })
                    }
                } else {
                    upper_arm = null
                }

                if (rowDressType[0].inseam) {
                    if (inseam === null) {
                        return res.status(400).json({ status: false, message: "Inseam measure required" })
                    }
                } else {
                    inseam = null
                }

                if (rowDressType[0].outseam) {
                    if (outseam === null) {
                        return res.status(400).json({ status: false, message: "Outseam measure required" })
                    }
                } else {
                    outseam = null
                }

                if (height === null) {
                    return res.status(400).json({ status: false, message: "Height measure required" })
                }
            }

            const [rowUpdate] = await db.promise().execute(
                "UPDATE order_item SET shoulder = ?, chest = ?, bust = ?, under_bust = ?, waist = ?, hip = ?, thigh = ?, total_rise = ?, calf = ?, upper_arm = ?, inseam = ?, outseam = ?, height = ? WHERE id = ?",
                [shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height, id])

            if (rowUpdate.affectedRows === 0) {
                return res.status(400).json({ status: false, message: "Item Update Failed" })
            }
            return res.status(200).json({ status: true, message: "Item Updated Successfully" })
        } else {
            return res.status(400).json({ status: false, message: "You can't update the item" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateOrderItemAdmin = async (req, res) => {
    const { id } = req.params
    const { employee_id } = req.body
    const user_id = req.user_id

    if (!id || !employee_id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [rowIsEmployeeExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [employee_id])
        if (rowIsEmployeeExist.length === 0) {
            return res.status(400).json({ status: false, message: "Employee Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ?", [id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        if (row[0].status === OrderItemStatus.NOT_ACCEPTED) {
            const [rowUpdate] = await db.promise().execute("UPDATE order_item SET employee_id = ? WHERE id = ?", [employee_id, id])
            if (rowUpdate.affectedRows === 0) {
                return res.status(400).json({ status: false, message: "Item Update Failed" })
            }
            return res.status(200).json({ status: true, message: "Item Updated Successfully" })
        } else {
            return res.status(400).json({ status: false, message: "You can't update the item" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

// Admin assign to employee now he accept it
const updateOrderItemEmployeeAccept = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    await db.promise().beginTransaction()

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ? AND employee_id = ?", [id, user_id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        if (row[0].status === OrderItemStatus.NOT_ACCEPTED) {
            const [rowUpdate] = await db.promise().execute("UPDATE order_item SET status = ? WHERE id = ?", [OrderItemStatus.ACCEPTED, id])
            if (rowUpdate.affectedRows === 0) {
                await db.promise().rollback()
                return res.status(400).json({ status: false, message: "You can't accept the order" })
            }
            const [rowOrderUpdate] = await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?", [OrderStatus.PROCESSING, row[0].order_id])
            if (rowOrderUpdate.affectedRows === 0) {
                await db.promise().rollback()
                return res.status(400).json({ status: false, message: "You can't accept the order" })
            }
            return res.status(200).json({ status: true, message: "You accepted the order" })
        } else {
            return res.status(400).json({ status: false, message: "You can't accept the order" })
        }
    } catch (error) {
        await db.promise().rollback()
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

// Employee accepted the order but now cancel it
const updateOrderItemEmployeeNotAccept = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    db.promise().beginTransaction()

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ? AND employee_id = ?", [id, user_id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        if (row[0].status === OrderItemStatus.ACCEPTED) {
            const [rowUpdate] = await db.promise().execute("UPDATE order_item SET status = ? WHERE id = ?", [OrderItemStatus.NOT_ACCEPTED, id])
            if (rowUpdate.affectedRows === 0) {
                return res.status(400).json({ status: false, message: "You can't cancelled the order" })
            }

            const [rowOrder] = await db.promise().execute("SELECT * FROM order_item WHERE order_id = ?", [row[0].order_id])
            if (rowOrder.length === 0) {
                await db.promise().rollback()
                return res.status(400).json({ status: false, message: "Server Error" })
            }

            const allCompleted = rowOrder.every(item => item.status === OrderItemStatus.NOT_ACCEPTED);
            if (allCompleted) {
                const [rowUpdateOrder] = await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?", [OrderStatus.PENDING, row[0].order_id])

                if (rowUpdateOrder.affectedRows === 0) {
                    await db.promise().rollback()
                    return res.status(400).json({ status: false, message: "Server Error" });
                }
            }

            const date = new Date().toISOString().split('T')[0]
            const [rowIsDateExist] = await db.promise().execute("SELECT * FROM `employee_stats` WHERE employee_id = ? AND date = ?", [user_id,date])
            if (rowIsDateExist.length === 0) {
                await db.promise().execute("INSERT INTO `employee_stats`(employee_id,date,cancel) VALUES(?,?,?)", [user_id, date, 1])
            } else {
                const employee_stats_id = rowIsDateExist[0].id
                const cancel = Number(rowIsDateExist[0].cancel) + 1
                await db.promise().execute("UPDATE `employee_stats` SET cancel = ? WHERE id = ?", [cancel, employee_stats_id])
            }

            await db.promise().commit()
            return res.status(200).json({ status: true, message: "You cancelled the order" })
        } else {
            return res.status(400).json({ status: false, message: "You can't cancelled the order" })
        }
    } catch (error) {
        await db.promise().rollback()
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

//Employee complete the order
const updateOrderItemEmployeeComplete = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    await db.promise().beginTransaction()

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM order_item WHERE id = ? AND employee_id = ?", [id, user_id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "Item not found" })
        }

        if (row[0].status === OrderItemStatus.ACCEPTED) {
            const [rowUpdate] = await db.promise().execute("UPDATE order_item SET status = ? WHERE id = ?", [OrderItemStatus.COMPLETED, id])
            if (rowUpdate.affectedRows === 0) {
                return res.status(400).json({ status: false, message: "You can't cancelled the order" })
            }

            const [rowOrder] = await db.promise().execute("SELECT * FROM order_item WHERE order_id = ?", [row[0].order_id])
            if (rowOrder.length === 0) {
                await db.promise().rollback()
                return res.status(400).json({ status: false, message: "Server Error" })
            }

            const allCompleted = rowOrder.every(item => item.status === OrderItemStatus.COMPLETED);
            if (allCompleted) {
                const [rowUpdateOrder] = await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?", [OrderStatus.SHIPPED, row[0].order_id])

                if (rowUpdateOrder.affectedRows === 0) {
                    await db.promise().rollback()
                    return res.status(400).json({ status: false, message: "Server Error" });
                }
            }

            const date = new Date().toISOString().split('T')[0]
            const [rowIsDateExist] = await db.promise().execute("SELECT * FROM `employee_stats` WHERE employee_id = ? AND date = ?", [user_id,date])
            if (rowIsDateExist.length === 0) {
                await db.promise().execute("INSERT INTO `employee_stats`(employee_id,date,complete) VALUES(?,?,?)", [user_id, date, 1])
            } else {
                const employee_stats_id = rowIsDateExist[0].id
                const complete = Number(rowIsDateExist[0].complete) + 1
                await db.promise().execute("UPDATE `employee_stats` SET complete = ? WHERE id = ?", [complete, employee_stats_id])
            }

            await db.promise().commit()
            return res.status(200).json({ status: true, message: "You completed the order" })
        } else {
            return res.status(400).json({ status: false, message: "You can't complete the order" })
        }
    } catch (error) {
        await db.promise().rollback()
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const orderItemController = {
    getOrderItemUser,
    getOrderItemAdmin,
    getOrderItemEmployee,
    getAllOrderItemsUser,
    getAllOrderItemsAdmin,
    getAllOrderItemsAdminForOrderId,
    getAllOrderItemsUserForOrderId,
    getAllOrderItemsEmployee,
    updateOrderItemUser,
    updateOrderItemAdmin,
    updateOrderItemEmployeeAccept,
    updateOrderItemEmployeeNotAccept,
    updateOrderItemEmployeeComplete
}

module.exports = orderItemController
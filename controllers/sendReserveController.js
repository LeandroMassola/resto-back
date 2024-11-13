const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');
const Reservation = require('../models/reserves')

module.exports = {
    sendSms: async (req, res) => {
        const {completeName, phone, date, time, numberOfPeople, commentarys} = req.body;
        const reservationId = uuidv4();
        console.log(phone);
        

        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

            try {
                const newReserve = await Reservation.create({
                    reservationId,
                    completeName,
                    phone,
                    date,
                    time,
                    numberOfPeople,
                    commentarys,
                    status: 'pending'
                })

                const confirmUrl = `http://localhost:5173/confirmReserve?reservationId=${reservationId}`

                const message = await client.messages.create({
                    body: `Reserva de: ${completeName}, Teléfono: ${phone}, Día y Hora: ${date} ${time}, Cantidad de personas: ${numberOfPeople}, Comentarios: ${commentarys}Confirma o reachaza la reserva siguiendo el enlace: ${confirmUrl}`,
                    from: +14013711399,
                    to: +34655116959
                }) 

                res.status(200).json({ success: true, message: 'Reserva enviada con éxito', data: message });
            } 
            catch (error) {
                console.error('Error enviando reserva:', error);
                res.status(500).json({ success: false, message: 'Error al enviar la reserva' });
            }   
        },

        getReservationById: async (req, res) => {
            const {reservationId} = req.params
            console.log('query: ' + reservationId);

            try {
                const reserve = await Reservation.findOne({where:{reservationId}})

                if (reserve) {
                    return res.status(200).json(reserve);
                } else {
                    res.status(404).json({message:'reserva no encontrada'})
                }
                res.send(reserve)
            } catch (error) {
                res.status(500).json({message: 'error al buscar en la base de datos', error})
            }
            
        },

        confirmReserve: async (req, res) => {
            const {status, reservationId, phone} = req.body

            let message;
            
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

            try {

                const reserve = await Reservation.findOne({where:{reservationId}})

                if (!reserve) {
                    return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
                }

                /* reserve.status = status;
                await reserve.save() */

                if(status == 'confirmada') {
                    message = `Your reserve with id: ${reservationId} has been successfuly made`
                } else if(status == 'rechazada') {
                    message = 'We are sorry to tell you that your reserve could not be made , please comunicate with the establishment'
                }
                await client.messages.create({
                    body: message,
                    from: +14013711399,
                    to: `+${phone}`
                })
                res.status(200).send(`Reserva ${status}`);
            } catch (error) {
                res.status(500).send("Error al enviar mensaje de actualización");
            }
        }
    }
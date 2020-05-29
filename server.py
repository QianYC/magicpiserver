import bluetooth

server_sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
server_sock.bind(("", bluetooth.PORT_ANY))


port = server_sock.getsockname()[1]
server_sock.listen(port)
uuid = "1e0ca4ea-299d-4335-93eb-27fcfe7fa848"

bluetooth.advertise_service(server_sock, "SampleServer", service_id=uuid
                            #service_classes=[uuid, bluetooth.SERIAL_PORT_CLASS],
                            #profiles=[bluetooth.SERIAL_PORT_PROFILE],
                            # protocols=[bluetooth.OBEX_UUID]
                            )

print("Waiting for connection on RFCOMM channel", port)

client_sock, client_info = server_sock.accept()
print("Accepted connection from", client_info)

try:
    while True:
        data = client_sock.recv(1024)
        if not data:
            break
        print("Received", data)
except OSError:
    pass

print("Disconnected.")

client_sock.close()
server_sock.close()
print("All done.")

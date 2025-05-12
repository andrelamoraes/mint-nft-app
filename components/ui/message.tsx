import { toast } from "react-toastify";

export const MintedMessage = () => {
          toast(
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: 500,
                padding: '1rem',
                boxSizing: 'border-box',
                color: '#fff',
                textAlign: 'center',
                backgroundColor: '#111', // só pra destacar
              }}
            >
              <img
                src="https://tan-informal-minnow-205.mypinata.cloud/ipfs/bafkreiev3pysrjpjin6sdvvrsk42fzroy2ileclvtvf3j722zk6343hmzm"
                alt="Colecionável"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  marginBottom: '1rem',
                }}
              />
              <span>Colecionável resgatado com sucesso!</span>
            </div>,
            {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark'
            }
          );
}
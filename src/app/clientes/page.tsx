import ClientesTable from "@/components/clientes/ClientesTable";
import { Cliente } from "./columns";
import * as actions from '@/actions';

async function getClientes(): Promise<Cliente[]> {
    const res = await actions.GetClientes();
    return res;
}

export default async function Clientes() {
    const clientes = await getClientes();
    return (
        <div className='my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Clientes</h3>
            <div className='max-w-[95rem] mx-auto w-full'>
                <ClientesTable clientes={clientes} />
            </div>
        </div>
    );
}
import * as actions from '@/actions';
import { Producto } from '../../types';
import ProductosTable from '@/components/productos/productos-tables';

async function getProductos(): Promise<Producto[]> {
    const res = await actions.GetProductos();
    return res;
}

export default async function Productos() {
    const productos = await getProductos();
    return (
        <div className='my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Productos</h3>
            <div className='max-w-[95rem] mx-auto w-full'>
                <ProductosTable productos={productos} />
            </div>
        </div>
    );
}

const smartgrid = require('smart-grid');
const settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 18, /* number of grid columns */
    offset: '25px', /* gutter width px || % || rem */
    mobileFirst: false,
    container: {
        maxWidth: '1140px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        },
        xss: {
            width: '350px'
        }
    }
};

smartgrid('./src/precss/libs/', settings);
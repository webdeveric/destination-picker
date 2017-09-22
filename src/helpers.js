export function noop()
{
  // No operation
}

export function getNodeEnv()
{
  return process.env.NODE_ENV;
}

export function slugify( text )
{
  return text.toString().trim().toLowerCase().replace(/[^\w\d\s]+/g, '').replace(/\s+/g, '-');
}

export function makeKey( ...args )
{
  return slugify( args.join(' ') );
}

export function cloneValues( obj )
{
  const values = Object.create(null);

  for( let property in obj ) {
    values[ property ] = obj[ property ];
  }

  return values;
}

export function delay( ms )
{
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export function classNames( names )
{
  return Object.keys( names ).map( key => names[ key ] ? key : false ).filter(Boolean).join(' ');
}

export function sectostr( totalSeconds )
{
  if ( ! isFinite(totalSeconds) ) {
    return '';
  }

  const time = {
    day:    Math.floor( totalSeconds / 86400 ),
    hour:   Math.floor( totalSeconds % 86400 / 3600 ),
    minute: Math.floor( totalSeconds % 3600 / 60 ),
    second: ( totalSeconds % 3600 % 60 ).toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
  };

  let output = '';

  for ( let key in time ) {
    let value = time[ key ];

    if ( value ) {
      output += ` ${value} ${key}`;

      if ( value > 1 ) {
        output += 's';
      }
    }
  }

  return output.trim();
}

import { getLeaderboardInfo } from '$lib/server/database/map';
import { getPlayerInfo } from '$lib/server/database/users';
import { parseLevelDifficulties } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import { createCanvas, loadImage } from 'canvas';

async function fetchImageAsDataURL(url: string, retry_url : string | undefined) {
    let res = await fetch(url);
    if (!res.ok) {
      if (retry_url == undefined) {
        throw new Error(`Failed to fetch image: ${url}`);
      }else{
        res = await fetch(retry_url);
        if (!res.ok) { throw new Error(`Failed to fetch image: ${url}`); }
      }
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    // Convert to base64 data URL
    const ext = url.split('.').pop(); // jpg or png
    return `data:image/${ext};base64,${buffer.toString('base64')}`;
}

function roundImageCorners(x : number,y : number,width : number,height : number,radius : number, ctx : any){
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function enableShadow(ctx : any, color : String) {
  ctx.shadowColor = color;
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function disableShadow(ctx : any) {
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

export const GET: RequestHandler = async ({ params }) => {
  try {
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    //background
    const gradient = ctx.createLinearGradient(0,height,width,0)

    gradient.addColorStop(0, 'rgba(10,45,80,1)');    // 0%
    gradient.addColorStop(0.33, 'rgba(15,15,15,1)'); // 33%
    gradient.addColorStop(0.66, 'rgba(15,15,15,1)'); // 66%
    gradient.addColorStop(1, 'rgba(80,10,10,1)');    // 100%
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,width,height);

    const map_info = await getLeaderboardInfo(params.map_id ? params.map_id : "", new Date())?? (() => { throw new Error("Map Data doesn't exist"); })();
    const player_info = await getPlayerInfo(params.user_id ? params.user_id : "");

    const player_image = await loadImage(await fetchImageAsDataURL(`https://cdn.scoresaber.com/avatars/${params.user_id}.jpg`, `https://cdn.scoresaber.com/avatars/oculus.png`))
    const map_image = await loadImage(await fetchImageAsDataURL(`https://cdn.scoresaber.com/covers/${map_info?.map_hash}.png`, undefined))
    const logo_image = await loadImage('./static/images/small-logo.png');

    const img_width = 375
    const img_top_padding = 75;
    const img_side_padding = 100;
    const img_border = 2

    
    //user pfp
    ctx.save();
    roundImageCorners(img_side_padding - img_border, img_top_padding - img_border, img_width + (img_border * 2), img_width + (img_border * 2), 40, ctx)
    enableShadow(ctx,'rgba(255, 255, 255, 1)')
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.fill();
    disableShadow(ctx)
    roundImageCorners(img_side_padding, img_top_padding, img_width, img_width, 40, ctx)
    ctx.clip()
    ctx.drawImage(
        player_image,
        img_side_padding,
        img_top_padding,
        img_width,
        img_width
    )
    ctx.restore()
    //username
    enableShadow(ctx,'rgba(0, 0, 0, 0.75)')
    ctx.fillStyle = '#ffffffff';
    ctx.font = 'bold 35px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(player_info ? player_info.name : "N/A", img_side_padding+(img_width/2), img_top_padding+img_width+35);
    disableShadow(ctx)

    //map pfp
    ctx.save();
    roundImageCorners(width - (img_side_padding + img_width) - img_border, img_top_padding - img_border, img_width + (img_border * 2), img_width + (img_border * 2), 40, ctx)
    enableShadow(ctx,'rgba(255, 255, 255, 1)')
    ctx.fillStyle = "'rgba(255, 255, 255, 1)'";
    ctx.fill();
    disableShadow(ctx)
    roundImageCorners(width - (img_side_padding + img_width), img_top_padding, img_width, img_width, 40, ctx)
    ctx.clip()
    ctx.drawImage(
        map_image,
        width - (img_side_padding + img_width),
        img_top_padding,
        img_width,
        img_width
    )
    ctx.restore()
    //map text
    enableShadow(ctx,'rgba(0, 0, 0, 0.75)')
    ctx.fillStyle = '#ffffffff';
    ctx.font = 'bold 35px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${map_info.song_name} By ${map_info.song_author_name} (${parseLevelDifficulties(map_info.difficulty)})`, width-img_side_padding-(img_width/2), img_top_padding+img_width+35);
    disableShadow(ctx)

    enableShadow(ctx,'rgba(0, 0, 0, 0.75)')
    ctx.fillStyle = '#838383ff';
    ctx.font = 'bold 25px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Mapped by ${map_info.level_author_name}`, width-img_side_padding-(img_width/2), img_top_padding+35+img_width+25);
    disableShadow(ctx)    

    //logo down bottom
    const logo_width = 900 / 1620
    enableShadow(ctx,'rgba(255, 255, 255, 0.25)')
    ctx.drawImage(
        logo_image,
        (width / 2) - ((logo_width * 1620) / 2),
        500,
        logo_width * 1620,
        logo_width * 256
    )
    disableShadow(ctx)

    let output = canvas.toBuffer("image/jpeg")

    return new Response(new Int8Array(output), {
        headers : { 'Content-Type' : 'image/png' }
    })

  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
};